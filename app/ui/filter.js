

export default function Filter() {
  return (
    <> 
        <div className="flex text-[12px] flex-row justify-between items-center rounded-[10px] p-2 bg-[#F9FBFF]"> 
            <div className="font-[400] text-[#B5B7C0]">Sort by: </div>
             <select className="font-[600] outline-none">
                <option>Newest</option>
                <option>Oldest</option>
             </select>
        </div>
    </>
  )
}
