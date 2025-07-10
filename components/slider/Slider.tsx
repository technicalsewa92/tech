'use client';

import dynamic from 'next/dynamic';
import Skeleton from '@/components/ui/Skeleton';

const SlideCard = dynamic(() => import('./SlideCard'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-40 rounded-md" />,
});

const Slider = ({ data, top }: any) => {
  const length = data?.length;

  return (
    <div className="w-full">
      <SlideCard top={top} length={top ? 5 : length} data={data} />
    </div>
  );
};

export default Slider;
