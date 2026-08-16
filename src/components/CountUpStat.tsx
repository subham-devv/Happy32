import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface CountUpStatProps {
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  duration?: number;
  variant?: 'light' | 'dark';
}

export const CountUpStat: React.FC<CountUpStatProps> = ({
  value,
  suffix,
  label,
  sublabel,
  icon,
  duration = 1800,
  variant = 'light',
}) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutExpo = 1 - Math.pow(1 - progress, 4);
            const currentCount = value * easeOutExpo;

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  const formattedCount =
    Number.isInteger(value) ? Math.floor(count) : count.toFixed(1);

  const isLight = variant === 'light';

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl p-5 md:p-6 flex flex-col items-center justify-between text-center transition-all duration-500 overflow-hidden hover:-translate-y-1.5 ${
        isLight
          ? 'bg-white/95 hover:bg-white border border-[#A8854A]/25 hover:border-[#A8854A]/70 shadow-sm hover:shadow-xl hover:shadow-[#A8854A]/15 backdrop-blur-sm'
          : 'bg-[#13110E] border border-[#A8854A]/25 hover:border-[#A8854A]/80 shadow-lg hover:shadow-2xl hover:shadow-[#A8854A]/20'
      }`}
    >
      {/* Radial Warm Gold Spotlight on Mouse Move */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isLight
            ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 133, 74, 0.18), transparent 75%)`
            : `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 133, 74, 0.22), transparent 75%)`,
        }}
      />

      {/* Top Gold Hairline Accent */}
      <div
        className={`absolute top-0 left-1/6 right-1/6 h-[1.5px] bg-gradient-to-r from-transparent via-[#A8854A] to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-x-110' : isLight ? 'opacity-25 scale-x-75' : 'opacity-40'
        }`}
      />

      {/* Content Stack */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Icon Pill */}
        {icon && (
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 transition-all duration-300 shadow-2xs ${
              isLight
                ? 'bg-[#F8F4EE] group-hover:bg-[#0E0C0A] border border-[#A8854A]/35 group-hover:border-[#D4AF37] text-[#A8854A] group-hover:text-[#D4AF37] group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md'
                : 'bg-[#1A1713] group-hover:bg-[#221E19] border border-[#A8854A]/30 group-hover:border-[#A8854A]/70 text-[#A8854A] group-hover:text-[#D4AF37] group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md'
            }`}
          >
            {icon}
          </div>
        )}

        {/* Count Numeral */}
        <div
          className={`flex items-baseline font-cormorant font-light text-4xl sm:text-5xl md:text-6xl tracking-tight transition-colors ${
            isLight
              ? 'text-[#0E0C0A] group-hover:text-[#B85C3A]'
              : 'text-[#F8F4EE] group-hover:text-white'
          }`}
        >
          <span>{formattedCount}</span>
          <span
            className={`font-light ml-1 transition-colors ${
              isLight
                ? 'text-[#A8854A] group-hover:text-[#B85C3A]'
                : 'text-[#A8854A] group-hover:text-[#D4AF37]'
            }`}
          >
            {suffix}
          </span>
        </div>

        {/* Label */}
        <p
          className={`font-dmSans font-medium text-xs md:text-sm tracking-[0.18em] uppercase mt-2 transition-colors ${
            isLight
              ? 'text-[#A8854A] group-hover:text-[#8D6D38]'
              : 'text-[#A8854A] group-hover:text-[#CBB280]'
          }`}
        >
          {label}
        </p>

        {sublabel && (
          <p
            className={`font-dmSans font-light text-[11px] mt-1 ${
              isLight ? 'text-[#7A6E64]' : 'text-[#A3978C]'
            }`}
          >
            {sublabel}
          </p>
        )}
      </div>
    </motion.div>
  );
};

