'use client';
import Link from 'next/link';
import React from 'react';

const TrainingCategorylist = ({
  activeId,
  categories = [],
}: {
  activeId?: string;
  categories: string[];
}) => {
  return (
    <div>
      {categories.map((cat: any, index: number) => (
        <Link
          href={`/trainings/${cat?.text?.replace(' ', '-').toLowerCase()}`}
          key={index}
          className={`hover:text-primary hover:font-semibold flex items-center justify-between py-1 border-b-[1px] border-solid border-[#3d4145] cursor-pointer ${
            activeId === cat?.value ? 'text-primary font-semibold' : ''
          }`}
        >
          <h3 className="text-[base]">{cat?.text}</h3>
        </Link>
      ))}
    </div>
  );
};

export default TrainingCategorylist;
