import React from 'react';
import { motion } from 'framer-motion';
import AudioButton from './AudioButton';

export default function QuestionCard({ idiom, questionNumber, totalQuestions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-secondary p-6 rounded-2xl border border-bg-tertiary mb-6"
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <div
                key={i}
                className={`h-1 w-8 rounded-full ${
                  i < questionNumber ? 'bg-accent-primary' : 'bg-bg-tertiary'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-accent-primary mb-2">
              "{idiom.expression}"
            </h3>
          </div>
          <AudioButton text={idiom.expression} />
        </div>

        <div className="flex items-start gap-3 bg-bg-tertiary p-4 rounded-lg">
          <div className="flex-1">
            <p className="text-text-secondary text-sm mb-1">Example:</p>
            <p className="text-text-primary italic">"{idiom.example}"</p>
          </div>
          <AudioButton text={idiom.example} />
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-text-primary">
          What does this idiom mean in Japanese?
        </p>
      </div>
    </motion.div>
  );
}
