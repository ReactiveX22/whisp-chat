'use client';
import { FC, useRef, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import Button from './ui/Button';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { BiSend } from 'react-icons/bi';
import { LuLoader2 } from 'react-icons/lu';

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post('/api/message/send', { text: input, chatId });
      setInput('');
      textareaRef.current?.focus();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        return;
      }
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='z-10 flex w-3/4 justify-between rounded-md bg-gray-900'>
      <div className='relative flex max-h-[50vh] flex-auto flex-col  rounded-lg bg-gray-900'>
        <ReactTextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`message ${chatPartner.name}`}
          className='z-0 overflow-y-scroll scroll-smooth rounded-md bg-gray-900 text-text scrollbar scrollbar-track-background scrollbar-thumb-gray-900 scrollbar-thumb-rounded-full scrollbar-w-2 placeholder:text-gray-600 focus:ring-0'
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'auto',
            border: 'none',
            paddingRight: '5rem',
            placeContent: 'center',
          }}
        />
      </div>
      <div className='relative'>
        <div className='absolute bottom-1 right-4 mx-2 flex h-8 w-8 items-center'>
          <Button
            variant='ghost'
            onClick={sendMessage}
            type='submit'
            className='h-full w-full p-1'
            disabled={isLoading}
          >
            {isLoading ? (
              <LuLoader2 className='h-full w-full animate-spin' />
            ) : (
              <BiSend className='h-full w-full' />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
