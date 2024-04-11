import FriendRequestsSidebarOption from '@/components/FriendRequestsSidebarOption';
import MobileChatLayout from '@/components/MobileChatLayout';
import SidebarChatList from '@/components/SidebarChatList';
import SignOutButton from '@/components/SignOutButton';
import SidebarOptions, { SidebarOption } from '@/components/ui/SidebarOptions';
import { getFreindsByUserId } from '@/helpers/get-friends-by-id';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const sideBarOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'add_friend',
    href: '/dashboard/add',
    Icon: 'BiUser',
    iconSize: 20,
    count: 0,
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const friends = await getFreindsByUserId(session.user.id);

  const initialUnseenRequestCount = (
    (await fetchRedis(
      'smembers',
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className='flex h-screen w-screen'>
      <div className='md:hidden'>
        <MobileChatLayout
          friends={friends}
          session={session}
          sideBarOptions={sideBarOptions}
          initialUnseenRequestCount={initialUnseenRequestCount}
        />
      </div>
      {/* sidebar */}
      <div className='hidden max-h-full max-w-lg flex-auto grow flex-col gap-y-6 border-r border-gray-900 bg-background px-3 transition-all ease-in-out  md:flex'>
        <Link
          href='/dashboard'
          className='mb-3 mt-6 flex place-content-center items-center text-3xl font-bold text-gray-600'
        >
          whisp_chat
        </Link>

        <nav className='flex flex-1 flex-col'>
          <ul
            role='list'
            className='flex flex-1 flex-col justify-between gap-y-1'
          >
            {friends.length > 0 ? (
              <>
                <div className='text-xs font-semibold leading-6 text-gray-600'>
                  Your Chats
                </div>
                <div className='max-w-full'>
                  <SidebarChatList
                    friends={friends}
                    sessionId={session.user.id}
                  />
                </div>
              </>
            ) : null}

            <li>
              <div className='text-xs font-semibold leading-6 text-gray-600'>
                Overview
              </div>

              <ul role='list' className='-mr-2 mt-3 max-w-full space-y-1'>
                {sideBarOptions.map((option) => {
                  return <SidebarOptions key={option.id} option={option} />;
                })}

                <FriendRequestsSidebarOption
                  sessionId={session.user.id}
                  initialUnseenRequestCount={initialUnseenRequestCount}
                />
              </ul>
            </li>

            <li className='-mx-6 mt-auto flex items-center'>
              <div className='flex max-w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-text'>
                <div className='relative h-9 w-9 shrink-0 rounded-full border-[1.6px] border-gray-900'>
                  <Image
                    fill
                    referrerPolicy='no-referrer'
                    className='rounded-full'
                    src={session.user.image || ''}
                    alt='Your Profile Picture'
                  />
                </div>
                <span className='sr-only'>Your Profile</span>
                <div className='flex flex-col truncate'>
                  <span aria-hidden='true'>{session.user.name}</span>
                  <span className='text-xs text-gray-600' aria-hidden='true'>
                    {session.user.email}
                  </span>
                </div>

                <SignOutButton className='aspect-square' />
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className='container m-0 flex h-screen py-14 md:py-0 '>
        {children}
      </div>
    </div>
  );
};

export default Layout;
