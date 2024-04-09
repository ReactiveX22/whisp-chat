import FriendRequests from '@/components/FriendRequests';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incoming_friend_requests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis('get', `user:${senderId}`)) as string;
      const senderParsed = JSON.parse(sender) as User;

      return { senderEmail: senderParsed.email, senderId };
    })
  );

  return (
    <main className=''>
      <h1 className='mb-8 text-5xl font-bold'>friend requests</h1>
      <div className='flex flex-col gap-4'>
        <FriendRequests
          incomingFriendRequests={incoming_friend_requests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default page;
