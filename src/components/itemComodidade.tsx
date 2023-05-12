import React from "react";

interface CompodidadesProps {
  title: string;
  className?: string;
  icon: React.ReactNode;
}

export function ItemComodidadeComponent({
  icon,
  title,
  className,
}: CompodidadesProps) {
  return (
    <div className={`flex justify-start items-center gap-x-6 ${className}`}>
      {icon}
      <p className="text-center text-lg flex justify-center items-center align-text-bottom">
        {title}
      </p>
    </div>
  );
}
