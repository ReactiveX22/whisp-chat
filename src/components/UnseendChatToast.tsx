import { chatHrefConstructor, cn } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';
import toast, { type Toast } from 'react-hot-toast';

interface UnseendChatToastProps {
  t: Toast;
  sessionId: string;
  senderId: string;
  senderImage: string;
  senderName: string;
  senderMessage: string;
}

const UnseendChatToast: FC<UnseendChatToastProps> = ({
  t,
  sessionId,
  senderId,
  senderImage,
  senderName,
  senderMessage,
}) => {
  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full max-w-md rounded-lg bg-background shadow-lg ring-1 ring-gray-900',
        { 'animate-enter': t.visible },
        { 'animate-leaver': !t.visible }
      )}
    >
      <a
        href={`/dashboard/chats/${chatHrefConstructor(sessionId, senderId)}`}
        onClick={() => toast.dismiss(t.id)}
        className='w-0 flex-1 p-4'
      >
        <div className='flex items-start '>
          <div className='flex-shrink-0 pt-0.5 '>
            <div className='relative h-10 w-10'>
              <Image
                fill
                referrerPolicy='no-referrer'
                className='rounded-full'
                src={senderImage}
                alt={`${senderName} profile picture`}
              />
            </div>
          </div>

          <div className='ml-3 flex-1'>
            <p className='text-sm font-medium text-gray-400'>{senderName}</p>
            <p className='mt-1 text-sm text-gray-400'>{senderMessage}</p>
          </div>
        </div>
      </a>

      <div className='flex border-l border-gray-900'>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='flex w-full items-center justify-center rounded-none rounded-r-lg border-transparent p-4 text-sm font-medium hover:text-gray-900'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UnseendChatToast;
