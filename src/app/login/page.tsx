'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import whispLogo from '@/assets/whisp-chat-logo.svg';
import googleLogo from '@/assets/google-logo.svg';

import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { error } from 'console';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
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
      <div className='flex min-h-full items-center  justify-center py-12 px-4 sm:px6 lg:px-8'>
        <div className='w-full flex flex-col items-center max-w-md space-y-8'>
          <div className='flex flex-col items-center gap-8'>
            {/* <Image src={whispLogo} alt='whisp-logo' height={100} width={100} /> */}
            <h1 className='mt-6 text-center text-9xl font-bold tracking-tighter text-gray-400'>
              Whisp_Chat
            </h1>
            <h2 className='mt-6 text-center text-3xl font-bold  tracking-tight text-gray-900'>
              Sign in to your Whisp account
            </h2>
          </div>
          <Button
            isLoading={isLoading}
            type='button'
            className='max-w-sm mx-auto w-full '
            onClick={loginWithGoogle}
          >
            {isLoading ? null : (
              <div className='pr-1'>
                <Image
                  src={googleLogo}
                  alt='google-logo'
                  width={16}
                  height={16}
                />
              </div>
            )}
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
