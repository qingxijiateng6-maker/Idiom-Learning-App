import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

export default function SessionList({ sessions, getSessionProgress }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Daily Conversation', 'Business', 'Academic'];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Daily Conversation':
        return BookOpen;
      case 'Business':
        return Briefcase;
      case 'Academic':
        return GraduationCap;
      default:
        return BookOpen;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Daily Conversation':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Business':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Academic':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.category === filter;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Learning Sessions</h2>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All' : category}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSessions.map((session, index) => {
          const progress = getSessionProgress(session.id);
          const isCompleted = progress !== null;
          const Icon = getCategoryIcon(session.category);

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-bg-secondary p-6 rounded-xl border border-bg-tertiary hover:border-accent-primary transition-all cursor-pointer"
              onClick={() => navigate(`/session/${session.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent-primary/10 rounded-lg">
                    <Icon className="text-accent-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Session {session.id}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {session.idiomCount} idioms
                    </p>
                  </div>
                </div>

                {isCompleted && (
                  <CheckCircle className="text-accent-success" size={24} />
                )}
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getCategoryColor(session.category)}`}>
                {session.category}
              </div>

              {isCompleted ? (
                <div className="flex items-center justify-between">
                  <div className="text-text-secondary text-sm">
                    Score: <span className="text-accent-success font-semibold">{progress.score}/20</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-bg-tertiary text-text-primary rounded-lg text-sm font-medium hover:bg-accent-primary hover:text-white transition-colors"
                  >
                    Review
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-accent-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start Session
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
