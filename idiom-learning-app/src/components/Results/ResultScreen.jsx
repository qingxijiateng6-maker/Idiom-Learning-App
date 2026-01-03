import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import Header from '../Common/Header';
import ScoreCard from './ScoreCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import useProgress from '../../hooks/useProgress';

export default function ResultScreen() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { getSessionProgress, getSessionIdioms, idioms } = useProgress();

  const sessionProgress = getSessionProgress(parseInt(sessionId));
  const sessionIdioms = getSessionIdioms(parseInt(sessionId));

  const reviewData = useMemo(() => {
    if (!sessionProgress || !sessionProgress.answers) return [];

    return sessionProgress.answers.map(answer => {
      const idiom = idioms.find(i => i.id === answer.questionId);
      return {
        ...answer,
        idiom
      };
    });
  }, [sessionProgress, idioms]);

  const incorrectAnswers = reviewData.filter(item => !item.isCorrect);

  if (!sessionProgress) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Header />
        <LoadingSpinner text="Loading results..." />
      </div>
    );
  }

  const nextSessionId = parseInt(sessionId) + 1;
  const hasNextSession = nextSessionId <= 15;

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Session {sessionId} Complete!
          </h1>
          <p className="text-text-secondary">
            Here's how you performed
          </p>
        </motion.div>

        <div className="mb-8">
          <ScoreCard score={sessionProgress.score} totalQuestions={sessionProgress.answers.length} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="p-4 bg-bg-secondary border border-bg-tertiary rounded-xl hover:border-accent-primary transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home size={20} />
            <span className="font-semibold">Dashboard</span>
          </motion.button>

          <motion.button
            onClick={() => navigate(`/session/${sessionId}`)}
            className="p-4 bg-bg-secondary border border-bg-tertiary rounded-xl hover:border-accent-primary transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw size={20} />
            <span className="font-semibold">Retry Session</span>
          </motion.button>

          {hasNextSession && (
            <motion.button
              onClick={() => navigate(`/session/${nextSessionId}`)}
              className="p-4 bg-accent-primary text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold">Next Session</span>
              <ArrowRight size={20} />
            </motion.button>
          )}
        </motion.div>

        {reviewData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-bg-secondary p-6 rounded-2xl border border-bg-tertiary"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Review Your Answers
            </h2>

            <div className="space-y-4">
              {reviewData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`p-4 rounded-xl border-2 ${
                    item.isCorrect
                      ? 'bg-accent-success/5 border-accent-success/20'
                      : 'bg-accent-error/5 border-accent-error/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {item.isCorrect ? (
                      <CheckCircle className="text-accent-success flex-shrink-0 mt-1" size={24} />
                    ) : (
                      <XCircle className="text-accent-error flex-shrink-0 mt-1" size={24} />
                    )}

                    <div className="flex-1">
                      <div className="mb-2">
                        <p className="text-sm text-text-secondary mb-1">Question {index + 1}</p>
                        <p className="text-lg font-semibold text-accent-primary">
                          "{item.idiom?.expression}"
                        </p>
                        <p className="text-text-secondary italic text-sm mt-1">
                          "{item.idiom?.example}"
                        </p>
                      </div>

                      <div className="space-y-2">
                        {!item.isCorrect && (
                          <div className="bg-accent-error/10 p-2 rounded">
                            <p className="text-sm text-text-secondary">Your answer:</p>
                            <p className="text-text-primary">{item.selectedAnswer}</p>
                          </div>
                        )}
                        <div className={`p-2 rounded ${item.isCorrect ? 'bg-accent-success/10' : 'bg-accent-success/5'}`}>
                          <p className="text-sm text-text-secondary">Correct answer:</p>
                          <p className="text-accent-success font-semibold">{item.correctAnswer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
