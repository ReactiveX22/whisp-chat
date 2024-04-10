import React from 'react';

interface SkeletonProps {
  className?: string;
  circle?: boolean;
  width?: number;
  height?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  circle,
  width,
  height,
}) => {
  const getWidthClass = () => {
    if (width === undefined) {
      return 'w-full';
    } else {
      return `w-${width}`;
    }
  };

  const getHeightClass = () => {
    if (height === undefined) {
      return 'h-full';
    } else {
      return `h-${height}`;
    }
  };

  const skeletonClasses: string = `animate-pulse bg-gray-900 ${className ? className : ''} ${
    circle ? 'rounded-full aspect-square' : 'rounded-md'
  } ${getWidthClass()} ${getHeightClass()}`;

  return <div className={skeletonClasses}></div>;
};

export default Skeleton;
