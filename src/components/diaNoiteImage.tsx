import { motion } from "framer-motion";
import React, { useState } from "react";

export const DayAndNightPhotos = () => {
  const [dividerPosition, setDividerPosition] = useState(0.5);

  const handleDrag = (event: any, info: any) => {
    const newDividerPosition = info?.point?.x / event?.target?.offsetWidth;
    setDividerPosition(newDividerPosition);
  };

  return (
    <motion.div
      className="relative w-[60%] h-[100%] overflow-hidden"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
    >
      <motion.img
        src="/images/piscina-noite.jpg"
        alt="Piscina à noite"
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset( 0 ${1 - dividerPosition}  0 0)` }}
      />
      <motion.img
        src="/images/tresguardasol.jpeg"
        alt="Guarda-sol em uma piscina durante o dia"
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 0 0 ${dividerPosition})` }}
      />
      <motion.div
        className="absolute inset-y-0 w-2 bg-white cursor-grab"
        style={{ left: `${dividerPosition * 100}%` }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
      />
    </motion.div>
  );
};
