import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  inView?: boolean;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  delay = 0,
  as: Component = 'h2',
  inView = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    const Tag = Component as any;
    return <Tag className={className}>{text}</Tag>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Tag = motion[Component as keyof typeof motion] as any;

  const justifyClass = className.includes('justify-')
    ? ''
    : className.includes('text-center')
    ? 'justify-center'
    : '';

  return (
    <Tag
      className={`flex flex-wrap gap-x-[0.25em] gap-y-1 ${justifyClass} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView={inView ? 'visible' : undefined}
      animate={!inView ? 'visible' : undefined}
      viewport={{ once: true, margin: '-10%' }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};
