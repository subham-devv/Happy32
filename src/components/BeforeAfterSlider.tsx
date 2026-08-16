import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CheckCircle2, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Initial Condition',
  afterLabel = 'Restored Result',
  caption,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(5, Math.min(95, percentage));
    setSliderPosition(percentage);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchend', onEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden select-none cursor-ew-resize bg-[#0E0C0A] border border-[#A8854A]/30 shadow-2xl group"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches[0]) handleMove(e.touches[0].clientX);
        }}
      >
        {/* After Image (Full width background - Restored Outcome) */}
        <img
          src={afterSrc}
          alt={afterLabel}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-102"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeSrc}
            alt={beforeLabel}
            referrerPolicy="no-referrer"
            className="absolute inset-y-0 left-0 max-w-none h-full object-cover transition-transform duration-700 group-hover:scale-102"
            style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
          />
        </div>

        {/* Floating Glassmorphic Badges */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-[#0E0C0A]/85 backdrop-blur-md text-[#E0D8CC] font-dmSans text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/15 shadow-md">
            <span>{beforeLabel}</span>
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-[#0E0C0A] font-dmSans text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E0C0A]" />
            <span>{afterLabel}</span>
          </span>
        </div>

        {/* Bottom Hint Banner */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-2 bg-[#0E0C0A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] font-dmSans text-[10px] font-medium tracking-widest uppercase shadow-xl">
            <MoveHorizontal className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>Drag slider to compare</span>
          </span>
        </div>

        {/* Divider Line & Handle */}
        <div
          className="absolute inset-y-0 pointer-events-none z-30 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Glowing Golden Line */}
          <div className="w-[2px] h-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]" />

          {/* Tactile Handle Button */}
          <div
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0E0C0A] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-all text-[#D4AF37]"
          >
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {caption && (
        <p className="font-dmSans font-light text-xs sm:text-sm text-[#A89C8E] italic mt-3.5 text-center">
          {caption}
        </p>
      )}
    </div>
  );
};

