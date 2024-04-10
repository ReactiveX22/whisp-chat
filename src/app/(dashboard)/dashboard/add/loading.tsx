import { FC } from 'react';
import Skeleton from '@/components/ui/Skeleton';

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <main className='flex w-full flex-col'>
      <h1 className='mb-8 flex  place-content-center font-bold text-gray-600'>
        <Skeleton className='h-[50px] w-[200px]' />
      </h1>
      <div className=' flex w-full shrink-0 space-x-5'>
        <Skeleton className='h-[50px] w-[400px]' />
        <Skeleton className='h-[50px] w-[100px]' />
      </div>
    </main>
  );
};

export default loading;
