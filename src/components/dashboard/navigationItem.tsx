import React, { ReactNode } from "react";
import { ButtonComponent } from "../button";
interface NavigationItemProps {
  icon?: ReactNode;
  title: "HOME" | "IMAGES" | "TEXTS" | "VALUES";
  setMenuOption: React.Dispatch<
    React.SetStateAction<"HOME" | "IMAGES" | "TEXTS" | "VALUES">
  >;
  isOpen: boolean;
}

export default function NavigationItemComponent({
  icon,
  title,
  isOpen,
  setMenuOption,
}: NavigationItemProps) {
  return (
    <ButtonComponent
      icon={icon}
      title={title}
      className={`flex items-center justify-start w-full text-white gap-x-4  hover:brightness-100
					${isOpen ? "brightness-100" : "brightness-50"}
					`}
      onClick={() => {
        setMenuOption(title);
      }}
    />
  );
}
