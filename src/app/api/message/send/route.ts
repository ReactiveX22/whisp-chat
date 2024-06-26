import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { nanoid } from 'nanoid';
import { messageValidator } from '@/lib/validations/message';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) return new Response('Unauthorized', { status: 401 });

    const [userId1, userId2] = chatId.split('--');

    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response('Unauthorized', { status: 401 });
    }

    const friendId = session.user.id === userId1 ? userId2 : userId1;

    const freindList = (await fetchRedis(
      'smembers',
      `user:${session.user.id}:friends`
    )) as string[];
    const isFriend = freindList.includes(friendId);

    if (!isFriend) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    const rawSender = (await fetchRedis(
      'get',
      `user:${session.user.id}`
    )) as string;

    const sender = JSON.parse(rawSender) as User;

    //valid, send msg
    const timestamp = Date.now();
    const messageData: Message = {
      id: nanoid(),
      senderId: session.user.id,
      text,
      timestamp,
    };
    const message = messageValidator.parse(messageData);

    //notify chatrooms
    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`chat:${chatId}`),
        'incoming_message',
        message
      ),
      pusherServer.trigger(
        toPusherKey(`user:${friendId}:chats`),
        'new_message',
        {
          ...message,
          senderImage: sender.image,
          senderName: sender.name,
        }
      ),

      await db.zadd(`chat:${chatId}`, {
        score: timestamp,
        member: JSON.stringify(message),
      }),
    ]);

    return new Response('OK', { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response('Internal Server Error', { status: 500 });
  }
}
