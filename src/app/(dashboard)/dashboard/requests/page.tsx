import FriendRequests from '@/components/FriendRequests';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  // ids of people who sent current logged in user a friend requests
  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds
      .filter((senderId) => senderId !== null) // Filter out null senderIds
      .map(async (senderId) => {
        const sender = (await fetchRedis('get', `user:${senderId}`)) as string;
        console.log(sender);

        if (sender !== null) {
          const senderParsed = JSON.parse(sender) as User;
          // Check if senderEmail is not null after parsing
          if (senderParsed.email !== null) {
            return {
              senderId,
              senderEmail: senderParsed.email,
            };
          }
        }
        // If senderId is null or senderEmail is null after parsing, do not return anything for this senderId
        return null;
      })
  ).then((requests) => requests.filter((request) => request !== null));

  return (
    <main className='flex w-full flex-col p-4'>
      <div className='ml-8 mt-2 flex h-full w-3/4 flex-col'>
        <h1 className='mb-8 flex text-3xl font-bold text-gray-600'>
          friend_requests
        </h1>
        <div className='flex flex-col gap-4'>
          <FriendRequests
            incomingFriendRequests={incomingFriendRequests}
            sessionId={session.user.id}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
