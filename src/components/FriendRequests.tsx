'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { BiCheck, BiCross, BiUser, BiUserPlus, BiX } from 'react-icons/bi';
import { LuUserPlus } from 'react-icons/lu';

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequests[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const [friendRequests, setFriendRequests] = useState<
    IncomingFriendRequests[]
  >(incomingFriendRequests);

  const router = useRouter();

  const acceptFriend = async (senderId: string) => {
    await axios.post('/api/friends/accept', { id: senderId });
    setFriendRequests((prev) =>
      prev.filter((request) => {
        request.senderId !== senderId;
      })
    );

    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post('/api/friends/deny', { id: senderId });
    setFriendRequests((prev) =>
      prev.filter((request) => {
        request.senderId !== senderId;
      })
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className='text-md text-gray-600'>Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className='flex items-center gap-4'>
            <LuUserPlus className='h-5 w-5 text-text' />
            <p className='text-lg font-medium'>{request.senderEmail}</p>
            <button
              onClick={() => acceptFriend(request.senderId)}
              aria-label='accept friend'
              className='grid h-8 w-8 place-items-center rounded-full bg-indigo-600 transition hover:bg-indigo-700 hover:shadow-md'
            >
              <BiCheck className='h-3/4 w-3/4 font-semibold text-text' />
            </button>

            <button
              onClick={() => denyFriend(request.senderId)}
              aria-label='deny friend'
              className='grid h-8 w-8 place-items-center rounded-full bg-red-600 transition hover:bg-red-700 hover:shadow-md'
            >
              <BiX className='h-3/4 w-3/4 font-semibold text-text' />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
