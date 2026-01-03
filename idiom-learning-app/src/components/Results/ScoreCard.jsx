import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp } from 'lucide-react';

export default function ScoreCard({ score, totalQuestions }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage === 100) return { text: 'Perfect Score!', icon: Trophy, color: 'text-yellow-400' };
    if (percentage >= 90) return { text: 'Excellent Work!', icon: Star, color: 'text-accent-success' };
    if (percentage >= 75) return { text: 'Great Job!', icon: TrendingUp, color: 'text-accent-primary' };
    if (percentage >= 60) return { text: 'Good Effort!', icon: TrendingUp, color: 'text-accent-primary' };
    return { text: 'Keep Practicing!', icon: TrendingUp, color: 'text-text-secondary' };
  };

  const { text, icon: Icon, color } = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="bg-gradient-to-br from-bg-secondary to-bg-tertiary p-8 rounded-2xl border border-bg-tertiary text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="flex justify-center mb-4"
      >
        <Icon className={`${color}`} size={64} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-3xl font-bold mb-2 ${color}`}
      >
        {text}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div className="text-6xl font-bold text-text-primary mb-2">
          {score}/{totalQuestions}
        </div>
        <div className="text-2xl text-text-secondary">
          {percentage}% Correct
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full bg-bg-tertiary rounded-full h-4 overflow-hidden"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className={`h-full rounded-full ${
            percentage >= 75 ? 'bg-accent-success' : percentage >= 60 ? 'bg-accent-primary' : 'bg-accent-error'
          }`}
        />
      </motion.div>
    </motion.div>
  );
}
