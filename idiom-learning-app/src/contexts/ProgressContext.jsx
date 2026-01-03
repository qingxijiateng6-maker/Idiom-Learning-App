import React, { createContext, useState, useEffect } from 'react';
import { collection, doc, setDoc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
import useAuth from '../hooks/useAuth';
import idiomsData from '../data/idioms.json';

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [savedWords, setSavedWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idioms] = useState(idiomsData.idioms);

  // Load user progress and saved words from Firestore
  useEffect(() => {
    if (!user) {
      setProgress({});
      setSavedWords([]);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        // Load progress
        const progressRef = collection(db, 'users', user.uid, 'progress');
        const progressSnap = await getDocs(progressRef);

        const progressData = {};
        progressSnap.forEach((doc) => {
          progressData[doc.id] = doc.data();
        });

        setProgress(progressData);

        // Load saved words
        const savedWordsRef = collection(db, 'users', user.uid, 'savedWords');
        const savedWordsSnap = await getDocs(savedWordsRef);

        const savedWordsData = [];
        savedWordsSnap.forEach((doc) => {
          savedWordsData.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setSavedWords(savedWordsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Save session progress
  const saveSessionProgress = async (sessionId, score, answers) => {
    if (!user) {
      throw new Error('User not logged in. Please log in to save your progress.');
    }

    try {
      const progressRef = doc(db, 'users', user.uid, 'progress', `session_${sessionId}`);
      const now = new Date();
      const sessionData = {
        sessionId,
        score,
        answers,
        completedAt: serverTimestamp(),
        completedAtLocal: now.toISOString()
      };

      await setDoc(progressRef, sessionData);

      // Update local state with local timestamp for immediate display
      setProgress(prev => ({
        ...prev,
        [`session_${sessionId}`]: {
          ...sessionData,
          completedAt: now
        }
      }));

      return sessionData;
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  };

  // Get session progress
  const getSessionProgress = (sessionId) => {
    return progress[`session_${sessionId}`] || null;
  };

  // Get overall statistics
  const getOverallStats = () => {
    const totalSessions = 15;
    const completedSessions = Object.keys(progress).length;
    const completionPercentage = Math.round((completedSessions / totalSessions) * 100);

    let totalScore = 0;
    let totalQuestions = 0;

    Object.values(progress).forEach((session) => {
      if (session.score !== undefined) {
        totalScore += session.score;
        totalQuestions += session.answers?.length || 20;
      }
    });

    const averageScore = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

    return {
      totalSessions,
      completedSessions,
      completionPercentage,
      averageScore,
      totalScore,
      totalQuestions
    };
  };

  // Get category-wise progress
  const getCategoryProgress = () => {
    const categories = ['Daily Conversation', 'Business', 'Academic'];
    const categoryStats = {};

    categories.forEach(category => {
      const categoryIdioms = idioms.filter(i => i.category === category);
      const categorySessionIds = [...new Set(categoryIdioms.map(i => i.session))];

      const completedSessionsInCategory = categorySessionIds.filter(
        sessionId => progress[`session_${sessionId}`]
      ).length;

      categoryStats[category] = {
        total: categorySessionIds.length,
        completed: completedSessionsInCategory,
        percentage: Math.round((completedSessionsInCategory / categorySessionIds.length) * 100)
      };
    });

    return categoryStats;
  };

  // Get idioms by session
  const getSessionIdioms = (sessionId) => {
    return idioms.filter(idiom => idiom.session === sessionId);
  };

  // Save a word for review
  const saveWord = async (idiom) => {
    if (!user) {
      throw new Error('User not logged in. Please log in to save words.');
    }

    try {
      const savedWordRef = doc(db, 'users', user.uid, 'savedWords', `idiom_${idiom.id}`);
      const savedWordData = {
        idiomId: idiom.id,
        idiom: idiom.idiom,
        meaning: idiom.meaning,
        example: idiom.example,
        category: idiom.category,
        savedAt: serverTimestamp(),
        savedAtLocal: new Date().toISOString()
      };

      await setDoc(savedWordRef, savedWordData);

      // Update local state
      setSavedWords(prev => [
        ...prev.filter(w => w.idiomId !== idiom.id),
        { id: `idiom_${idiom.id}`, ...savedWordData, savedAt: new Date() }
      ]);

      return savedWordData;
    } catch (error) {
      console.error('Error saving word:', error);
      throw error;
    }
  };

  // Remove a saved word
  const removeSavedWord = async (idiomId) => {
    if (!user) {
      throw new Error('User not logged in.');
    }

    try {
      const savedWordRef = doc(db, 'users', user.uid, 'savedWords', `idiom_${idiomId}`);
      await deleteDoc(savedWordRef);

      // Update local state
      setSavedWords(prev => prev.filter(w => w.idiomId !== idiomId));
    } catch (error) {
      console.error('Error removing saved word:', error);
      throw error;
    }
  };

  // Check if a word is saved
  const isWordSaved = (idiomId) => {
    return savedWords.some(w => w.idiomId === idiomId);
  };

  const value = {
    progress,
    savedWords,
    loading,
    idioms,
    saveSessionProgress,
    getSessionProgress,
    getOverallStats,
    getCategoryProgress,
    getSessionIdioms,
    saveWord,
    removeSavedWord,
    isWordSaved
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
