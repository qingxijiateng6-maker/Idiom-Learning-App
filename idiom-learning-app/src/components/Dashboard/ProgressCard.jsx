import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award } from 'lucide-react';

export default function ProgressCard({ stats }) {
  const { completedSessions, totalSessions, completionPercentage, averageScore } = stats;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-bg-secondary to-bg-tertiary p-6 rounded-2xl border border-bg-tertiary"
    >
      <h2 className="text-2xl font-bold text-text-primary mb-6">Your Progress</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center mb-4">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-bg-tertiary"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                className="text-accent-primary"
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - completionPercentage / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-accent-primary">
                {completionPercentage}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <Target size={16} />
            <span className="text-sm">Overall Completion</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <TrendingUp className="text-accent-success mb-2" size={32} />
          <div className="text-4xl font-bold text-text-primary mb-1">
            {completedSessions}/{totalSessions}
          </div>
          <div className="text-text-secondary text-sm">Sessions Completed</div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Award className="text-accent-primary mb-2" size={32} />
          <div className="text-4xl font-bold text-text-primary mb-1">
            {averageScore}%
          </div>
          <div className="text-text-secondary text-sm">Average Score</div>
        </div>
      </div>
    </motion.div>
  );
}
