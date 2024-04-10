import Link from 'next/link';
import { Icon, Icons, iconSize } from '../Icons';
import { FC } from 'react';

export interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
  iconSize: iconSize;
  count: number | 0;
}

type SidebarOptionsProps = {
  option: SidebarOption;
};

const SidebarOptions: FC<SidebarOptionsProps> = ({ option }) => {
  const Icon = Icons[option.Icon];
  return (
    <li key={option.id}>
      <Link
        href={option.href}
        className='group flex items-center gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-text hover:bg-gray-900 hover:text-primary'
      >
        <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[0.625rem] font-medium text-gray-400 group-hover:text-primary'>
          <Icon size={option.iconSize} />
        </span>
        <span className='truncate'>{option.name}</span>
        {option.count > 0 ? (
          <div className='flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs'>
            {option.count}
          </div>
        ) : null}
      </Link>
    </li>
  );
};

export default SidebarOptions;
