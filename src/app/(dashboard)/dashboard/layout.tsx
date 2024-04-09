import FriendRequestsSidebarOption from '@/components/FriendRequestsSidebarOption';
import { Icon, Icons } from '@/components/Icons';
import SidebarChatList from '@/components/SidebarChatList';
import SignOutButton from '@/components/SignOutButton';
import Button from '@/components/ui/Button';
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

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sideBarOptions: SidebarOption[] = [
  { id: 1, name: 'Add Friend', href: '/dashboard/add', Icon: 'FiUserPlus' },
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
      {/* sidebar */}
      <div className='hidden h-full max-w-xs flex-auto grow flex-col gap-y-5 border-r border-text bg-background px-6 md:flex'>
        <Link
          href='/dashboard'
          className='flex h-16 place-content-center items-center text-3xl font-bold text-gray-600'
        >
          whisp_chat
        </Link>

        {friends.length > 0 ? (
          <div className='text-xs font-semibold leading-6 text-gray-600'>
            Your Chats
          </div>
        ) : null}

        <nav className='flex flex-1 flex-col'>
          <ul role='list' className='flex flex-1 flex-col gap-y-6'>
            <li className='max-w-full'>
              <SidebarChatList friends={friends} sessionId={session.user.id} />
            </li>
            <li>
              <div className='text-xs font-semibold leading-6 text-gray-600'>
                Overview
              </div>

              <ul role='list' className='-mr-2 mt-3 max-w-full space-y-1'>
                {sideBarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className='group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-text hover:bg-gray-900 hover:text-primary'
                      >
                        <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-[0.625rem] font-medium text-gray-400 group-hover:border-primary group-hover:text-primary'>
                          <Icon className='h-4 w-4' />
                        </span>
                        <span className='truncate'>{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <FriendRequestsSidebarOption
                sessionId={session.user.id}
                initialUnseenRequestCount={initialUnseenRequestCount}
              />
            </li>

            <li className='-mx-6 mt-auto flex items-center'>
              <div className='flex max-w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-text'>
                <div className='relative h-9 w-9 shrink-0 rounded-full border-[1.6px] border-gray-600'>
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
      <div className='w-full'>{children}</div>
    </div>
  );
};

export default Layout;
