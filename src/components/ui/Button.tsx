import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { LuLoader2 } from 'react-icons/lu';
import { ButtonHTMLAttributes, FC } from 'react';

const buttonVariants = cva(
  '[word-spacing:-5px] text-md font-bold inline-flex items-center justify-center transition rounded-full disabled:pointer-events-none disabled:opacity-25',
  {
    variants: {
      variant: {
        default: 'bg-primary text-background',
        ghost: 'bg-transparent text-text group',
      },
      size: {
        default: 'h-10 py-2 px-2',
        large: 'h-16 py-2 px-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <LuLoader2 className='mr-3 h-4 w-4 animate-spin' /> : null}
      {children}
    </button>
  );
};

export default Button;
