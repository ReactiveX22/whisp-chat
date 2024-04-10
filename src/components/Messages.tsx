'use client';

import { cn, toPusherKey } from '@/lib/utils';
import { Message } from '@/lib/validations/message';
import { FC, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { pusherClient } from '@/lib/pusher';

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
  sessionImage: string | undefined | null;
  chatPartner: User;
  chatId: string;
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  sessionImage,
  chatPartner,
  chatId,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };

    pusherClient.bind('incoming_message', messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind('incoming_message', messageHandler);
    };
  }, [chatId]);

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, 'HH:mm aaa');
  };

  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id='messages'
      className='flex h-full flex-1 flex-col-reverse  gap-4 overflow-y-auto scroll-smooth p-3 scrollbar scrollbar-track-background scrollbar-thumb-gray-900 scrollbar-thumb-rounded-full scrollbar-w-2'
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
                  'mx-2 flex max-w-sm flex-col space-y-2 text-base',
                  {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn('inline-block rounded-lg px-4 py-2', {
                    'bg-gray-800 text-text': !isCurrentUser,
                    'bg-gray-900 text-text': isCurrentUser,
                    'rounded-br-none':
                      !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{' '}
                  <span className='ml-2 text-[0.7rem] tracking-tight text-gray-600 [word-spacing:-5px]'>
                    {formatTimestamp(message.timestamp)}
                  </span>
                </span>
              </div>

              <div
                className={cn('relative h-6 w-6', {
                  'order-2': isCurrentUser,
                  'order-1': !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <Image
                  fill
                  src={
                    isCurrentUser
                      ? (sessionImage as string)
                      : (chatPartner.image as string)
                  }
                  alt='profile picture'
                  className='rounded-full'
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
