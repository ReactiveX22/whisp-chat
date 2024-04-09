'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import { BiUser } from 'react-icons/bi';

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
    <Link
      href='/dashboard/requests'
      className='group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:text-indigo-600 '
    >
      <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-400 text-[0.625rem] font-medium group-hover:border-indigo-600'>
        <BiUser />
      </div>
      <p className='truncate'>Friend Requests</p>
      {unseenRequestCount > 0 ? (
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs'>
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestsSidebarOption;
