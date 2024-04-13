'use client'
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from "../lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRightRounded, ChevronLeftRounded } from '@mui/icons-material';

export default function Pagination({totalPages}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
  
    const createPageURL = (pageNumber) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    };
  
    const allPages = generatePagination(currentPage, totalPages);
  
    return (
    <div className='flex flex-row justify-between items-center'>
        <div className='text-[#B5B7C0] text-[14px] leading-[21px] font-[500]'>Showing data 1 to 8 of  256K entries</div>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
  
        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position;
  
            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';
  
            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>
  
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
      </div>
    );
  }
  
  function PaginationNumber({
    page,
    href,
    isActive,
    position,
  }) {
    const className = clsx(
      'flex h-10 w-10 items-center justify-center text-sm border',
      {
        'rounded-l-md': position === 'first' || position === 'single',
        'rounded-r-md': position === 'last' || position === 'single',
        'z-10 bg-[#5932EA] border-[#5932EA] text-white': isActive,
        'hover:bg-gray-100': !isActive && position !== 'middle',
        'text-gray-300': position === 'middle',
      },
    );
  
    return isActive || position === 'middle' ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  }
  
  function PaginationArrow({
    href,
    direction,
    isDisabled,
  }) {
    const className = clsx(
      'flex h-10 w-10 items-center justify-center rounded-md border',
      {
        'pointer-events-none text-gray-300': isDisabled,
        'hover:bg-gray-100': !isDisabled,
        'mr-2 md:mr-4': direction === 'left',
        'ml-2 md:ml-4': direction === 'right',
      },
    );
  
    const icon =
      direction === 'left' ? (
        <ChevronLeftRounded className="w-4" />
      ) : (
        <ChevronRightRounded className="w-4" />
      );
  
    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link className={className} href={href}>
        {icon}
      </Link>
    );
  }
