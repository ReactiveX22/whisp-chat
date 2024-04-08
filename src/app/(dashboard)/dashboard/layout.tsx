import { Icon, Icons } from '@/components/Icons';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC, ReactNode } from 'react';

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
  if (!session) notFound();

  return (
    <div className='flex h-screen w-full'>
      <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-500 p-5'>
        <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
          whisp_chat
        </Link>
        <div className='text-xs font-semibold leading-6'>Your Chats</div>
        <nav className='flex flex-1 flex-col'>
          <ul role='list' className='flex flex-1 flex-col gap-y-7'>
            <li>Chats</li>
            <li>
              <div className='text-xs font-semibold leading-6'>Overview</div>
            </li>
            <ul role='list' className='-mr-2 mt-2 space-y-1'>
              {sideBarOptions.map((option) => {
                const Icon = Icons[option.Icon];
                return (
                  <li key={option.id}>
                    <Link
                      href={option.href}
                      className='group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-primary hover:text-secondary'
                    >
                      <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white font-medium text-[0.625] group-hover:border-primary group-hover:text-black'>
                        <Icon className='h-4 w-4' />
                      </span>
                      <span className='truncate'>{option.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
