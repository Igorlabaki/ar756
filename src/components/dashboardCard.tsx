import React, { HTMLAttributes, HtmlHTMLAttributes } from "react";

interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {}

export default function DashboardCardComponent({
  children,
  className,
}: DashboardCardProps) {
  return (
    <div
      className={`relative flex flex-col w-full py-5 space-x-5 text-[19px] text-gray-400 bg-[#313338] rounded-md px-9 gap-y-5 gap-x-5 shadow-lg hover:cursor-pointer hover:scale-[1.01] hover:brightness-125 transition duration-300  ${className}`}
    >
      {children}
    </div>
  );
}
