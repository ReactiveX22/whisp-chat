'use client';

import { addFriendValidator } from '@/lib/validations/add-friend';
import axios, { AxiosError } from 'axios';
import { FC, useState } from 'react';
import Button from './ui/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    setIsLoading(true);

    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post('/api/friends/add', {
        email: validatedEmail,
      });
      setIsLoading(false);
      setShowSuccessState(true);
      toast.success('Friend request sent!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Email err');
        setError('email', { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        // setError('email', { message: error.response?.data });
        toast.error(error.response?.data);

        return;
      }

      setError('email', { message: 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <div className='w-full md:max-w-[65%]'>
      <form onSubmit={handleSubmit(onSubmit)} className='min-w-sm'>
        <label htmlFor='email' className='block text-sm font-medium leading-6'>
          Add friends by E-Mail
        </label>

        <div className='mt-2 flex flex-col items-center gap-4 md:w-3/4 md:flex-row'>
          <input
            {...register('email')}
            type='text'
            className='text-md block max-h-8 grow rounded-md border-0 bg-text py-1 text-background  placeholder:text-gray-600 sm:text-sm sm:leading-6'
            placeholder='you@example.com'
          />
          <Button
            variant='default'
            className='w-fit shrink-0 bg-primary px-6 md:max-w-fit'
            isLoading={isLoading}
          >
            Add
          </Button>
        </div>
        <p className='mt-2 text-sm text-red-400'>{errors.email?.message}</p>
        {showSuccessState ? (
          <p className='mt-2 text-sm text-green-400'>Friend request sent!</p>
        ) : null}
      </form>
    </div>
  );
};

export default AddFriendButton;
