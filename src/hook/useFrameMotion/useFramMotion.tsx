import { motion, useAnimation } from "framer-motion";

export default function UseFrameMmotion() {
  const shakeAnimation = {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.3 },
  };

  const opacityHidde = {
    opacity: [1, 0],
  };

  const opacityShow = {
    opacity: [0, 1],
  };

  return {
    shakeAnimation,
    opacityHidde,
    opacityShow,
    useAnimation,
    motion,
  };
}
