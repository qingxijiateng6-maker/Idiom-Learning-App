import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function ChoiceButton({ option, isCorrect, isSelected, onClick, showFeedback, disabled }) {
  const getButtonStyle = () => {
    if (!showFeedback) {
      return isSelected
        ? 'bg-accent-primary border-accent-primary text-white'
        : 'bg-bg-secondary border-bg-tertiary text-text-primary hover:bg-bg-tertiary hover:border-accent-primary';
    }

    if (isCorrect) {
      return 'bg-accent-success/20 border-accent-success text-accent-success';
    }

    if (isSelected && !isCorrect) {
      return 'bg-accent-error/20 border-accent-error text-accent-error';
    }

    return 'bg-bg-secondary border-bg-tertiary text-text-secondary opacity-50';
  };

  const getIcon = () => {
    if (!showFeedback) return null;

    if (isCorrect) {
      return <Check size={20} className="flex-shrink-0" />;
    }

    if (isSelected && !isCorrect) {
      return <X size={20} className="flex-shrink-0" />;
    }

    return null;
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || showFeedback}
      className={`p-4 rounded-xl text-left w-full border-2 transition-all ${getButtonStyle()} disabled:cursor-not-allowed flex items-center gap-3`}
      whileHover={!disabled && !showFeedback ? { scale: 1.02, x: 4 } : {}}
      whileTap={!disabled && !showFeedback ? { scale: 0.98 } : {}}
      animate={
        showFeedback && isSelected && !isCorrect
          ? {
              x: [0, -10, 10, -10, 10, 0],
              transition: { duration: 0.5 }
            }
          : {}
      }
    >
      {getIcon()}
      <span className="flex-1">{option}</span>
    </motion.button>
  );
}
