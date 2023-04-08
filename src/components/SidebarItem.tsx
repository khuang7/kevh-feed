import React, { useCallback } from "react";
import { type IconType } from "react-icons";

import { BsDot } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  href,
  auth,
  onClick,
}) => {
  const { user } = useUser();

  const sideBarItem = (
    <div
      onClick={() => {
        onClick && onClick();
      }}
      className="flex flex-row items-center"
    >
      <div
        className="
    relative
    flex 
    h-14
    w-14
    cursor-pointer
    items-center
    justify-center 
    rounded-full
    p-4 
    hover:bg-slate-300 
    hover:bg-opacity-10 
    lg:hidden
  "
      >
        {icon}
      </div>
      <div
        className="
    items-row
    relative 
    hidden 
    cursor-pointer 
    items-center 
    gap-4 
    rounded-full 
    p-4 
    hover:bg-slate-300 
    hover:bg-opacity-10
    lg:flex
  "
      >
        {icon}
        <p className="hidden text-xl text-white lg:block">{label}</p>
      </div>
    </div>
  );

  return href ? <Link href={href}>{sideBarItem}</Link> : sideBarItem;
};

export default SidebarItem;
