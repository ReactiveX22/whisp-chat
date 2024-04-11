'use client';

import Button from '@/components/ui/Button';

import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

interface pageProps {}

const Login: FC<pageProps> = () => {
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
    <div className='max-w-screen flex h-screen flex-col justify-center gap-5 p-10 md:w-screen'>
      <div className=''>
        <p>
          A chatting app designed for simplicity and ease. Add friends, chat,
          and enjoy the vibe.
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        <h1 className=''>whisp_chat</h1>
        <Button
          isLoading={isLoading}
          type='button'
          className='w-fit shadow-sm shadow-black hover:shadow-[0px_0px_15px_-6px] hover:shadow-primary'
          onClick={loginWithGoogle}
        >
          {isLoading ? null : <FaGoogle className='mr-3 h-4 w-4' />}
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
