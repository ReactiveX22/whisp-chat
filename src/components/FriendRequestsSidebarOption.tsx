'use client';

import { FC, useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import SidebarOptions, { SidebarOption } from './ui/SidebarOptions';

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

  const sideBarOption: SidebarOption = {
    id: 2,
    name: 'friend_requests',
    href: '/dashboard/requests',
    Icon: 'BiUser',
    iconSize: 20,
    count: 10,
  };

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestCount((prev) => prev + 1);
    };

    const addedFriendHandler = () => {
      setUnseenRequestCount((prev) => prev - 1);
    };

    pusherClient.bind('incoming_friend_requests', friendRequestHandler);
    pusherClient.bind('new_friend', addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler);
      pusherClient.unbind('new_friend', addedFriendHandler);
    };
  }, [sessionId]);

  sideBarOption.count = unseenRequestCount;

  return <SidebarOptions option={sideBarOption} />;
};

export default FriendRequestsSidebarOption;
