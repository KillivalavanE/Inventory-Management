"use client"
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSideBarCollapsed } from "@/state";
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarProps {
  href:string,
  icon:LucideIcon,
  label:string,
  isCollapsed:boolean
}
const SideBarLinks = ({href,icon:Icon,label,isCollapsed}:SideBarProps) => {
  const pathname=usePathname()
  const isActive=pathname===href || (pathname==='/' && href==='/dashboard')
  return (
    <Link href={href}> 
      <div className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"} hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors
      ${isActive ? "bg-blue-200 text-white" : ""} `}>
        <Icon className="w-6 h-6 !text-gray-700"/>
        <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>{label}</span>
      </div>
    </Link>
  )
}

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const isSideBarCollapsed = useAppSelector((state)=>state.global.isSideBarCollapsed);
  const toggleSiderbar = () =>{
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))
  }

  const SidebarClassNames = `fixed flex flex-col ${isSideBarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`
  return (
    <div className={SidebarClassNames}>
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSideBarCollapsed ? "px-5" : "px-8"}`}>
            {/* <div className="block"><Image src="/public/logo.png" alt="logo" width={20} height={20}/></div> */}
            <h1 className={`${isSideBarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>Inventora</h1>
            <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={toggleSiderbar}>
                <Menu className="w-4 h-4"/>
            </button>
        </div>
        <div className="flex-grow mt-8">
          <SideBarLinks href="/dashboard" icon={Layout} label="Dashboard" isCollapsed={isSideBarCollapsed}/>
          <SideBarLinks href="/inventory" icon={Archive} label="Inventory" isCollapsed={isSideBarCollapsed}/>
          <SideBarLinks href="/products" icon={Clipboard} label="Products" isCollapsed={isSideBarCollapsed}/>
          <SideBarLinks href="/users" icon={User} label="Users" isCollapsed={isSideBarCollapsed}/>
          <SideBarLinks href="/settings" icon={SlidersHorizontal} label="Settings" isCollapsed={isSideBarCollapsed}/>
          <SideBarLinks href="/expenses" icon={CircleDollarSign} label="Expenses" isCollapsed={isSideBarCollapsed}/>
        </div>
        <div className={`${isSideBarCollapsed ? "hidden" : "block"} mb-10`}>
            <p className="text-center text-sm text-gray-500">&copy; 2024 Inventora</p>
        </div>
    </div>
  )
}

export default Sidebar