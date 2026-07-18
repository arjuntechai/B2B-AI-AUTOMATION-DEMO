import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Magnetic({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Drift up to 6px toward the mouse cursor
    const moveX = (deltaX / (width / 2)) * 6;
    const moveY = (deltaY / (height / 2)) * 6;

    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 12, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
