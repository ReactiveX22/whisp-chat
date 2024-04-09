'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import Button from './ui/Button';
import toast from 'react-hot-toast';

interface FriendRequestsSidebarOptionProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}

const FriendRequestsSidebarOption: FC<FriendRequestsSidebarOptionProps> = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );

  return (
    <>
      <Link
        href='/dashboard/requests'
        className='group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-text hover:bg-gray-900 hover:text-primary'
      >
        <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-[0.625rem] font-medium text-gray-400 group-hover:border-primary group-hover:text-primary'>
          <BiUser className='h-4 w-4' />
        </span>
        <p className='truncate'>Friend Requests</p>
        {unseenRequestCount > 0 ? (
          <div className='flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs'>
            {unseenRequestCount}
          </div>
        ) : null}
      </Link>
    </>
  );
};

export default FriendRequestsSidebarOption;
