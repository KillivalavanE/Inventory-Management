"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSideBarCollapsed } from "@/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );
  const toggleSiderbar = () => {
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
  };
  const isDarkModeSelected = useAppSelector((state)=>state.global.isDarkMode);
  const toggleDarkMode = () =>{
    dispatch(setIsDarkMode(!isDarkModeSelected));
  }
  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/*Left side*/}
      <div className="flex justify-between items-center gap-5">
        <button
          className="p-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSiderbar}
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>
      {/*right side*/}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkModeSelected ? (<Sun className="cursor-pointer text-gray-500" size={24} />):(<Moon className="cursor-pointer text-gray-500" size={24} />)}
              
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className={`absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-bold leading-none text-red-100 bg-red-400 rounded-full ${isDarkModeSelected ? "font-bold" : ""}`}>
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-gray-500 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="https://inventory-managemet-s3.s3.ap-south-1.amazonaws.com/profile.jpg" alt="profile" width={50} height={50} className="rounded-full h-full object-cover"/>
            <span className="font-semibold">Killivalavan</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
