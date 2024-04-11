import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { chatHrefConstructor } from '@/lib/utils';
import { FaChevronRight } from 'react-icons/fa6';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFreindsByUserId } from '@/helpers/get-friends-by-id';

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFreindsByUserId(session.user.id);

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageRaw] = (await fetchRedis(
        'zrange',
        `chat:${chatHrefConstructor(session.user.id, friend.id)}`,
        -1,
        -1
      )) as string[];

      // const lastMessage = JSON.parse(lastMessageRaw) as Message;
      // Check if lastMessageRaw is undefined before parsing
      let lastMessage;
      if (lastMessageRaw) {
        lastMessage = JSON.parse(lastMessageRaw) as Message;
      } else {
        // If lastMessageRaw is undefined, set a default value for lastMessage
        // This could be an empty object or a specific default message object
        lastMessage = { text: 'No messages yet', senderId: null };
      }

      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return (
    <div className='container flex flex-col pl-14 pt-6'>
      <h1 className='mb-8 text-3xl font-bold'>recent_chats</h1>
      {friendsWithLastMessage.length === 0 ? (
        <p className='text-sm text-gray-600'>empty</p>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <div
            key={friend.id}
            className='relative max-w-full rounded-md border border-gray-900 p-3  md:max-w-[50%]'
          >
            <div className='absolute inset-y-0 right-4 flex items-center font-thin'>
              <FaChevronRight className='h-6 w-6 text-gray-900' />
            </div>

            <Link
              href={`/dashboard/chat/${chatHrefConstructor(
                session.user.id,
                friend.id
              )}`}
              className='relative flex gap-3 overflow-hidden'
            >
              <div className='flex items-center'>
                <div className='relative h-9 w-9'>
                  <Image
                    referrerPolicy='no-referrer'
                    className='rounded-full'
                    alt={`${friend.name} profile picture`}
                    src={friend.image}
                    fill
                  />
                </div>
              </div>

              <div>
                <h4 className='text-lg'>{friend.name}</h4>
                <p className='max-w-md truncate text-sm text-gray-500'>
                  <span className='text-gray-600'>
                    {friend.lastMessage.senderId === session.user.id
                      ? 'You: '
                      : ''}
                  </span>
                  {friend.lastMessage.text}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default page;
