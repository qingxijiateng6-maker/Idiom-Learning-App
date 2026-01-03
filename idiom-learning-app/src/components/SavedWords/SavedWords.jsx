import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Trash2, Search } from 'lucide-react';
import Header from '../Common/Header';
import LoadingSpinner from '../Common/LoadingSpinner';
import useProgress from '../../hooks/useProgress';

export default function SavedWords() {
  const { savedWords, removeSavedWord, loading } = useProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [removing, setRemoving] = useState(null);

  const handleRemove = async (idiomId) => {
    if (!window.confirm('Remove this expression from your saved list?')) {
      return;
    }

    setRemoving(idiomId);
    try {
      await removeSavedWord(idiomId);
    } catch (error) {
      alert('Failed to remove expression. Please try again.');
    } finally {
      setRemoving(null);
    }
  };

  const filteredWords = savedWords.filter(word =>
    word.idiom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.meaning?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Header />
        <LoadingSpinner text="Loading saved expressions..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="text-accent-primary" size={32} />
            <h1 className="text-3xl font-bold text-text-primary">
              Saved Expressions
            </h1>
          </div>
          <p className="text-text-secondary">
            Review the expressions you've saved for later study
          </p>
        </motion.div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search saved expressions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>
        </div>

        {savedWords.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Bookmark className="mx-auto mb-4 text-text-secondary" size={64} />
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              No saved expressions yet
            </h2>
            <p className="text-text-secondary">
              Save expressions during your learning sessions to review them later
            </p>
          </motion.div>
        ) : filteredWords.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="mx-auto mb-4 text-text-secondary" size={64} />
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              No matching expressions
            </h2>
            <p className="text-text-secondary">
              Try searching with different keywords
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <p className="text-text-secondary mb-4">
              {filteredWords.length} expression{filteredWords.length !== 1 ? 's' : ''} found
            </p>
            <AnimatePresence>
              {filteredWords.map((word) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-bg-secondary border border-bg-tertiary rounded-xl p-6 hover:border-accent-primary transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-accent-primary mb-2">
                        {word.idiom}
                      </h3>
                      <p className="text-text-primary mb-3">
                        {word.meaning}
                      </p>
                      <div className="bg-bg-tertiary rounded-lg p-3 mb-3">
                        <p className="text-sm text-text-secondary italic">
                          "{word.example}"
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="px-3 py-1 bg-bg-tertiary rounded-full">
                          {word.category}
                        </span>
                        {word.savedAtLocal && (
                          <span>
                            Saved {new Date(word.savedAtLocal).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.button
                      onClick={() => handleRemove(word.idiomId)}
                      disabled={removing === word.idiomId}
                      className="p-3 rounded-lg bg-bg-tertiary hover:bg-accent-error hover:text-white transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Remove from saved"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
