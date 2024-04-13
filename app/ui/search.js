'use client'
import { SearchOutlined } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
  
    const handleSearch = useDebouncedCallback((term) => {
      console.log(`Searching... ${term}`);
  
      const params = new URLSearchParams(searchParams);
  
      params.set('page', '1');
  
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className="flex px-2 text-[12px] gap-2  flex-row justify-between items-center rounded-[10px] bg-[#F9FBFF]"> 
            <SearchOutlined className="text-[#B5B7C0]" />
            <input type="search" onChange={(e) => handleSearch(e.target.value)} placeholder="Search" className="text-[#B5B7C0] bg-transparent p-2 outline-none" />
    </div>
  )
}
