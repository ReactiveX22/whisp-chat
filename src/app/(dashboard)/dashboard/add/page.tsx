import AddFriendButton from '@/components/AddFriendButton';
import { FC } from 'react';

const page: FC = ({}) => {
  return (
    <main className='flex w-full flex-col'>
      <h1 className='mb-8 flex place-content-center text-3xl font-bold text-gray-600'>
        add friends
      </h1>
      <div className=' flex w-full shrink-0 place-content-between'>
        <AddFriendButton />
      </div>
    </main>
  );
};

export default page;
