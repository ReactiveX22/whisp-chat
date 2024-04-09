'use client';

import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,
          style: {
            background: '#05080d',
            color: '#e1e8f4',
            border: '1px solid #e1e8f4',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            style: {
              background: '#05080d',
              color: '#e1f4e4',
              border: '1px solid #e1f4e4',
            },
          },

          error: {
            duration: 3000,
            style: {
              background: '#05080d',
              color: '#f4e1e1',
              border: '1px solid #f4e1e1',
            },
          },
        }}
      />
      {children}
    </>
  );
};

export default Providers;
