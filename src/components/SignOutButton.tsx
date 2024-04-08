'use client';
import { ButtonHTMLAttributes, FC, useState } from 'react';
import Button from './ui/Button';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { LuLoader } from 'react-icons/lu';
import { BiLogOut } from 'react-icons/bi';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  return (
    <Button
      {...props}
      variant='default'
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
        <LuLoader className='h-4 w-4 animate-spin' />
      ) : (
        <BiLogOut />
      )}
    </Button>
  );
};

export default SignOutButton;
