'use client';
import { pusherClient } from '@/lib/pusher';
import { chatHrefConstructor, toPusherKey } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UnseendChatToast from './UnseendChatToast';

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

interface ExtendedMessage extends Message {
  senderImage: string;
  senderName: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

      if (!shouldNotify) return;

      //notify
      toast.custom((t) => (
        <UnseendChatToast
          t={t}
          senderId={message.senderId}
          sessionId={sessionId}
          senderImage={message.senderImage}
          senderName={message.senderName}
          senderMessage={message.text}
        />
      ));

      setUnseenMessages((prev) => [...prev, message]);
    };

    const newFriendHandler = () => {
      router.replace(pathname!);
    };

    pusherClient.bind('new_message', chatHandler);
    pusherClient.bind('new_friend', newFriendHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
      pusherClient.unbind('new_message', chatHandler);
      pusherClient.unbind('new_message', newFriendHandler);
    };
  }, [sessionId, pathname, router]);

  useEffect(() => {
    if (pathname?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul
      role='list'
      className='max-h-[25rem] max-w-full space-y-1 overflow-y-auto'
    >
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
          return unseenMessage.senderId === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <div className='truncate rounded-md p-2 hover:bg-gray-900'>
              <a
                href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`}
                className='group flex items-center gap-x-3 rounded-md text-sm leading-6 tracking-wide'
              >
                {friend.email}
                {unseenMessagesCount > 0 ? (
                  <div className='flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs'>
                    {unseenMessagesCount}
                  </div>
                ) : null}
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
