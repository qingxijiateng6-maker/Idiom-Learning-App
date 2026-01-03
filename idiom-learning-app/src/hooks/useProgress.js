import { useContext } from 'react';
import { ProgressContext } from '../contexts/ProgressContext';

/**
 * Custom hook to use progress context
 * @returns {Object} Progress state and methods
 */
export default function useProgress() {
  const context = useContext(ProgressContext);

  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  return context;
}
