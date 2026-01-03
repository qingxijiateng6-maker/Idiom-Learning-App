import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Brain, TrendingUp, Award } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: BookOpen,
      title: '300 Idioms',
      description: 'Learn 300 essential English idioms across 15 sessions'
    },
    {
      icon: Brain,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with engaging multiple-choice quizzes'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed statistics'
    },
    {
      icon: Award,
      title: 'Audio Support',
      description: 'Listen to native pronunciation with text-to-speech'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <BookOpen className="text-accent-primary" size={48} />
            <h1 className="text-5xl font-bold text-text-primary">
              English Idioms
            </h1>
          </motion.div>

          <p className="text-xl text-text-secondary mb-8">
            Master English idioms through interactive learning
          </p>

          <div className="flex gap-4 justify-center">
            <motion.button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-accent-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>

            <motion.button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-bg-tertiary text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-bg-secondary p-6 rounded-xl border border-bg-tertiary hover:border-accent-primary transition-colors"
            >
              <feature.icon className="text-accent-primary mb-4" size={32} />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
