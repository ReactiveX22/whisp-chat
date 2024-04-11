'use client';

import { FC } from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Button from './ui/Button';
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import FriendRequestsSidebarOption from './FriendRequestsSidebarOption';
import SidebarOptions, { SidebarOption } from './ui/SidebarOptions';
import SidebarChatList from './SidebarChatList';
import { BiMenu } from 'react-icons/bi';
import { Session } from 'next-auth';

interface MobileChatLayoutProps {
  friends: User[];
  session: Session;
  sideBarOptions: SidebarOption[];
  initialUnseenRequestCount: number;
}

const MobileChatLayout: FC<MobileChatLayoutProps> = ({
  friends,
  session,
  sideBarOptions,
  initialUnseenRequestCount,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='fixed inset-x-0 top-0 border-b border-gray-600 bg-background px-4 py-2'>
      <div className='flex w-full items-center justify-between '>
        <Link href='/dashboard' className='text-gray-600'>
          whisp_chat
        </Link>

        <Button
          variant='ghost'
          onClick={() => setOpen(true)}
          className='gap-2 border border-gray-600 px-4 font-normal tracking-wider'
        >
          Menu <BiMenu className='h-6 w-6' />
        </Button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto relative w-screen max-w-max'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-500'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-500'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                        <button
                          type='button'
                          className='relative rounded-md bg-background p-1 font-bold text-text hover:text-text'
                          onClick={() => setOpen(false)}
                        >
                          <span className='absolute -inset-2.5' />
                          <span className='sr-only'>Close panel</span>
                          <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className='flex h-full flex-col overflow-y-auto bg-background py-6 shadow-xl'>
                      <div className='hidden px-4 sm:px-6'>
                        <Dialog.Title className='text-base font-semibold leading-6 text-gray-400'>
                          Panel title
                        </Dialog.Title>
                      </div>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                        {/* Your content */}
                        <div className='flex h-full w-full flex-auto grow flex-col gap-y-6  bg-background '>
                          <nav className='flex flex-1 flex-col'>
                            <ul
                              role='list'
                              className='flex flex-1 flex-col justify-between gap-y-1'
                            >
                              {friends.length > 0 ? (
                                <>
                                  <div className='text-xs font-semibold leading-6 text-gray-600'>
                                    Your Chats
                                  </div>
                                  <div
                                    className='max-w-full'
                                    onClick={() => setOpen(false)}
                                  >
                                    <SidebarChatList
                                      friends={friends}
                                      sessionId={session.user.id}
                                    />
                                  </div>
                                </>
                              ) : null}

                              <li>
                                <div className='text-xs font-semibold leading-6 text-gray-600'>
                                  Overview
                                </div>

                                <ul
                                  onClick={() => setOpen(false)}
                                  role='list'
                                  className='-mr-2 mt-3 max-w-full space-y-1'
                                >
                                  {sideBarOptions.map((option) => {
                                    return (
                                      <SidebarOptions
                                        key={option.id}
                                        option={option}
                                      />
                                    );
                                  })}

                                  <FriendRequestsSidebarOption
                                    sessionId={session.user.id}
                                    initialUnseenRequestCount={
                                      initialUnseenRequestCount
                                    }
                                  />
                                </ul>
                              </li>

                              <li className='-mx-6 mt-auto flex items-center'>
                                <div className='flex max-w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-text'>
                                  <div className='relative h-9 w-9 shrink-0 rounded-full border-[1.6px] border-gray-900'>
                                    <Image
                                      fill
                                      referrerPolicy='no-referrer'
                                      className='rounded-full'
                                      src={session.user.image || ''}
                                      alt='Your Profile Picture'
                                    />
                                  </div>
                                  <span className='sr-only'>Your Profile</span>
                                  <div className='flex flex-col truncate'>
                                    <span aria-hidden='true'>
                                      {session.user.name}
                                    </span>
                                    <span
                                      className='text-xs text-gray-600'
                                      aria-hidden='true'
                                    >
                                      {session.user.email}
                                    </span>
                                  </div>

                                  <SignOutButton className='aspect-square' />
                                </div>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MobileChatLayout;
