import SideNav from '../ui/dashboard/sidenav';

export default function LayOut({children}) {
  return (
    <>
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow px-4 md:overflow-y-auto md:px-4 md:px-8">{children}</div>
    </div>
    </>
  )
}
