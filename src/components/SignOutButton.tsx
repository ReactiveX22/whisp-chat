'use client';
import { ButtonHTMLAttributes, FC, useState } from 'react';
import Button from './ui/Button';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { LuLoader } from 'react-icons/lu';
import { BiLogOut } from 'react-icons/bi';
import { redirect } from 'next/navigation';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  return (
    <Button
      {...props}
      variant='ghost'
      onClick={async () => {
        setIsSigningOut(true);
        try {
          await signOut();
        } catch (error) {
          toast.error('Problem with signing out.');
        } finally {
          setIsSigningOut(false);
        }
      }}
    >
      {isSigningOut ? (
        <span className='fflex h-full w-full shrink-0 items-center justify-center bg-background text-[0.625rem] font-medium text-gray-400 hover:bg-primary hover:text-background'>
          <LuLoader className='h-full w-full animate-spin' />
        </span>
      ) : (
        <BiLogOut className='flex h-full w-full shrink-0 items-center justify-center bg-background text-[0.625rem] font-medium text-gray-400' />
      )}
    </Button>
  );
};

export default SignOutButton;
