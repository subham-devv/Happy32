import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  shape?: 'rect' | 'crescent';
  delay?: number;
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  shape = 'rect',
  delay = 0,
}) => {
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const crescentClipPath =
    'polygon(0% 0%, 85% 0%, 100% 8%, 100% 92%, 85% 100%, 0% 100%)';

  const containerStyle: React.CSSProperties = {
    clipPath: shape === 'crescent' ? crescentClipPath : undefined,
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#EDE8DF] reveal-image ${className}`}
      style={containerStyle}
    >
      {!hasError ? (
        <div className="w-full h-full">
          <motion.img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + 0.2,
              ease: 'easeOut',
            }}
            className={`w-full h-full object-cover select-none ${imageClassName}`}
          />
        </div>
      ) : (
        <div className="w-full h-full min-h-[240px] bg-[#EDE8DF] flex flex-col items-center justify-center p-6 text-center text-[#7A6E64] font-dmSans text-xs">
          <span className="font-medium text-[#0E0C0A] mb-1">{alt}</span>
          <span className="text-[10px] tracking-wider uppercase opacity-75 font-mono">
            /* REPLACE_WITH_REAL */
          </span>
        </div>
      )}
    </div>
  );
};
