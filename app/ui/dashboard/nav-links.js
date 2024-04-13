"use client"
import { AccountBoxOutlined, ChevronRightRounded, DiscountOutlined, LiveHelpOutlined, ViewInAr, WalletOutlined } from "@mui/icons-material"
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function NavLinks({open}) {

    const pathname = usePathname();
    const links = [
        {
            name: "Product",
            href: "/dashboard/products",
            icon: <ViewInAr />
        },
        {
            name: "Categories",
            href: "/dashboard/categories",
            icon: <AccountBoxOutlined />
        },
        {
            name: "Income",
            href: "/",
            icon: <WalletOutlined />
        },
        {
            name: "Promote",
            href: "/",
            icon: <DiscountOutlined />
        },
        {
            name: "Help",
            href: "/",
            icon: <LiveHelpOutlined />
        }
    ]
  return (
    <>
        {links.map(link => {
            return (
                <Link
                    key={link.name}
                    href={link.href}
                    className={
                        clsx(
                            'flex mx-auto self-center gap-4 flex-row mb-2 items-center px-2 py-3 rounded-[10px]',
                            {
                                'text-white w-10/12 bg-black justify-between': (pathname === link.href && open)
                            },
                            {
                                'justify-between w-10/12 text-[#9197B3] bg-white': (pathname != link.href && open)
                            }, 
                            {
                                "text-center w-[55%] justify-center text-white mx-auto bg-[#5932EA]": (pathname === link.href && !open)
                            }, 
                            {
                                "text-center w-[55%] text-[#9197B3] justify-center": (pathname != link.href && !open)
                            }
                        )
                    }
                    >
                        <div className="flex flex-row justify-between items-center gap-3">
                            <div>{link.icon}</div>
                            {open && <div>{link.name}</div>}
                        </div>
                        {open && <ChevronRightRounded />}
                    </Link>
            )
        })}
    </>
  )
}
