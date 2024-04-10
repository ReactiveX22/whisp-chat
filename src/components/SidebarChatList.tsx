'use client';
import { chatHrefConstructor } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

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
                  <div className='place-content-center bg-red-500 text-xs font-medium text-background'>
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
