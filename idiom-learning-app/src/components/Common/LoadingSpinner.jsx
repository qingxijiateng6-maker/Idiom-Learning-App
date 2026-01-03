import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-bg-tertiary border-t-accent-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <p className="mt-4 text-text-secondary">{text}</p>
      )}
    </div>
  );
}
