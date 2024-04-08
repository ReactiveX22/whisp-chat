'use client';

import Button from '@/components/ui/Button';

import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

interface pageProps {}

const Login: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      toast.error('Something went wrong with your login');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <div className='flex items-center justify-center gap-10 h-[200px]'>
          <div className='w-96 p-5 text-wrap text-xl text-right leading-loose'>
            a chatting app designed for simplicity and ease. add friends, chat,
            and enjoy the vibe.
          </div>
          <div className='flex flex-col items-start justify-evenly h-full'>
            <h1 className='text-5xl font-bold'>whisp_chat</h1>
            <Button
              isLoading={isLoading}
              type='button'
              className='w-1/2 shadow-black shadow-sm hover:shadow-primary hover:shadow-[0px_0px_15px_-6px]'
              onClick={loginWithGoogle}
            >
              {isLoading ? null : <FaGoogle className='mr-3 h-4 w-4' />}
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
