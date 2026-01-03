import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../Common/Header';
import ProgressCard from './ProgressCard';
import SessionList from './SessionList';
import LoadingSpinner from '../Common/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import useProgress from '../../hooks/useProgress';

export default function Dashboard() {
  const { user } = useAuth();
  const { idioms, getSessionProgress, getOverallStats, loading } = useProgress();

  const sessions = useMemo(() => {
    const sessionMap = new Map();

    idioms.forEach(idiom => {
      if (!sessionMap.has(idiom.session)) {
        sessionMap.set(idiom.session, {
          id: idiom.session,
          category: idiom.category,
          idiomCount: 0
        });
      }
      sessionMap.get(idiom.session).idiomCount += 1;
    });

    return Array.from(sessionMap.values()).sort((a, b) => a.id - b.id);
  }, [idioms]);

  const stats = getOverallStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Header />
        <LoadingSpinner text="Loading your progress..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome back, {user?.displayName || 'Learner'}!
          </h1>
          <p className="text-text-secondary">
            Continue your journey to master English idioms
          </p>
        </motion.div>

        <div className="mb-8">
          <ProgressCard stats={stats} />
        </div>

        <SessionList sessions={sessions} getSessionProgress={getSessionProgress} />
      </div>
    </div>
  );
}
