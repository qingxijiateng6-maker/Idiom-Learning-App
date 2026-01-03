import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, BookOpen, Bookmark } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <header className="bg-bg-secondary border-b border-bg-tertiary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="text-accent-primary" size={28} />
            <h1 className="text-xl font-bold text-text-primary">
              English Idioms
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-text-primary font-medium">
                {user.displayName || 'User'}
              </p>
              <p className="text-xs text-text-secondary">
                {user.email}
              </p>
            </div>

            <motion.button
              onClick={() => navigate('/saved-words')}
              className="p-2 rounded-lg bg-bg-tertiary hover:bg-accent-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Saved Expressions"
            >
              <Bookmark size={20} />
            </motion.button>

            <motion.button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-bg-tertiary hover:bg-accent-error transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Logout"
            >
              <LogOut size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
