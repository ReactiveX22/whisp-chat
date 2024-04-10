'use client';

import { cn } from '@/lib/utils';
import { Message } from '@/lib/validations/message';
import { FC, useRef, useState } from 'react';

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, sessionId }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id='messages'
      className='scrollbar-thumb-primary scrollbar-track-background scrollbar-w-2 scrollbar-thumb-rounded-full  flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto scroll-smooth p-3'
    >
      <div ref={scrollDownRef} />

      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <div
            className='chat-message'
            key={`${message.senderId}-${message.timestamp}`}
          >
            <div
              className={cn('flex items-end', { 'justify-end': isCurrentUser })}
            >
              <div
                className={cn(
                  'mx-2 flex max-w-xs flex-col space-y-2 text-base',
                  {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn('inline-block rounded-lg px-4 py-2', {
                    'bg-primary text-background': isCurrentUser,
                    'bg-gray-900 text-text': !isCurrentUser,
                    'rounded-br-none':
                      !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{' '}
                  <span className='ml-2 text-xs text-gray-600'>
                    {message.timestamp}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
