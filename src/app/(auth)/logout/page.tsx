'use client';

import Button from '@/components/ui/Button';

import { FC, useState } from 'react';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
interface pageProps {}

const Login: FC<pageProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      toast.error('Something went wrong with your login');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <div className='flex h-[200px] items-center justify-center gap-10'>
          <div className='w-96 text-wrap p-5 text-right text-xl leading-loose'></div>
          <div className='flex h-full flex-col items-start justify-evenly'>
            <h1 className='text-5xl font-bold'>whisp_chat</h1>
            <Button
              isLoading={isLoading}
              type='button'
              className='w-1/2 shadow-sm shadow-black hover:shadow-[0px_0px_15px_-6px] hover:shadow-primary'
              onClick={loginWithGoogle}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
