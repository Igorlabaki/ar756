import React, { ReactElement, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

export function SectionComponent({ children }: SectionProps) {
  return (
    <div className="relative flex flex-col items-center justify-start w-full h-screen pt-5 pb-5 ">
      {children}
    </div>
  );
}
