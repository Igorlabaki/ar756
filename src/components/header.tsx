import React from "react";
import { Exo } from "next/font/google";

const exu = Exo({ subsets: ["latin"] });

export function HeaderComponent() {
  return (
    <div className="px-5 py-5 lg:px-14">
      <p
        className={`
                ${exu.className}
                text-[2.5rem] md:text-4xl lg:text-7xl
                font-semibold
                animate-openItems
            `}
      >
        AR756_
      </p>
    </div>
  );
}
