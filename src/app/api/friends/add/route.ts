import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { addFriendValidator } from '@/lib/validations/add-friend';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const idToAdd = (await fetchRedis(
      'get',
      `user:email:${emailToAdd}`
    )) as string;

    // Replaced Code
    // const RESTResponse = await fetch(
    //   `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    //     },
    //     cache: `no-store`,
    //   }
    // );

    // const data = (await RESTResponse.json()) as { result: string | null };

    if (!idToAdd) {
      return new Response('This user doesnt exist.', { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new Response('You cannot add yourself as friend', { status: 400 });
    }

    // friend request already sent
    const isAlreadyAdded = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response('Already sent friend request to this user.', {
        status: 400,
      });
    }

    // friend already added
    const isAlreadyFriends = (await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response('User is already a friend', {
        status: 400,
      });
    }

    // valid, sent friend request
    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    return new Response('ok');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 });
    }

    return new Response('Invalid request', { status: 400 });
  }
};
