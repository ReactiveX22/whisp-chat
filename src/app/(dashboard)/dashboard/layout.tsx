import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <div className='w-full flex h-screen'>
      <div className='flex h-full w-full mx-w-xs grow flex-fol gap-y-5 overflow-y-auto border-r border-gray-50'>
        <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
          whisp_chat
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
