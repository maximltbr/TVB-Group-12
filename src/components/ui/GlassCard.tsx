
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animate?: boolean;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  animate = true,
  className = '',
  hoverEffect = true,
  ...props 
}) => {
  return animate ? (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/50 shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  ) : (
    <div
      className={cn(
        'rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/50 shadow-xl',
        hoverEffect && 'hover:-translate-y-1 transition-transform duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
