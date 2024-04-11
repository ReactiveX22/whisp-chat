import AddFriendButton from '@/components/AddFriendButton';

const page = () => {
  return (
    <main className='flex w-full flex-col p-4'>
      <div className='ml-8 mt-2 flex h-full w-3/4 flex-col'>
        <h1 className='mb-8 flex text-3xl font-bold text-gray-600'>
          add_friends
        </h1>
        <div className=' flex w-full shrink-0 place-content-between'>
          <AddFriendButton />
        </div>
      </div>
    </main>
  );
};

export default page;
