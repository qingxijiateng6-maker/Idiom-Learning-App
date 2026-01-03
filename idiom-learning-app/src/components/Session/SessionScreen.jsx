import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import Header from '../Common/Header';
import QuestionCard from './QuestionCard';
import ChoiceButton from './ChoiceButton';
import LoadingSpinner from '../Common/LoadingSpinner';
import useProgress from '../../hooks/useProgress';
import { generateSessionQuestions } from '../../utils/questionGenerator';

export default function SessionScreen() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { idioms, getSessionIdioms, saveSessionProgress } = useProgress();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sessionIdioms = useMemo(() => {
    return getSessionIdioms(parseInt(sessionId));
  }, [sessionId, getSessionIdioms]);

  const questions = useMemo(() => {
    if (sessionIdioms.length === 0) return [];
    return generateSessionQuestions(sessionIdioms, idioms);
  }, [sessionIdioms, idioms]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (sessionIdioms.length === 0) {
      navigate('/dashboard');
    }
  }, [sessionIdioms, navigate]);

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setShowFeedback(true);

    const answerData = {
      questionId: currentQuestion.idiom.id,
      isCorrect,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer
    };

    setAnswers([...answers, answerData]);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsLoading(true);
      try {
        const score = answers.filter(a => a.isCorrect).length + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
        await saveSessionProgress(parseInt(sessionId), score, [...answers, {
          questionId: currentQuestion.idiom.id,
          isCorrect: selectedAnswer === currentQuestion.correctAnswer,
          selectedAnswer,
          correctAnswer: currentQuestion.correctAnswer
        }]);
        navigate(`/results/${sessionId}`);
      } catch (error) {
        console.error('Error saving progress:', error);
        setIsLoading(false);
      }
    }
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will not be saved.')) {
      navigate('/dashboard');
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Header />
        <LoadingSpinner text="Loading session..." />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Header />
        <LoadingSpinner text="Saving your progress..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-text-primary">
            Session {sessionId}
          </h1>
          <motion.button
            onClick={handleExit}
            className="p-2 rounded-lg bg-bg-tertiary hover:bg-accent-error transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Exit session"
          >
            <X size={20} />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              idiom={currentQuestion.idiom}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <ChoiceButton
                  key={index}
                  option={option}
                  isCorrect={option === currentQuestion.correctAnswer}
                  isSelected={selectedAnswer === option}
                  onClick={() => handleAnswerSelect(option)}
                  showFeedback={showFeedback}
                  disabled={showFeedback}
                />
              ))}
            </div>

            {!showFeedback ? (
              <motion.button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full py-4 bg-accent-primary text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={selectedAnswer ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer ? { scale: 0.98 } : {}}
              >
                Submit Answer
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className={`p-4 rounded-xl border-2 ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-accent-success/10 border-accent-success'
                    : 'bg-accent-error/10 border-accent-error'
                }`}>
                  <p className={`text-lg font-semibold ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'text-accent-success'
                      : 'text-accent-error'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? '✓ Correct!'
                      : '✗ Incorrect'}
                  </p>
                  {selectedAnswer !== currentQuestion.correctAnswer && (
                    <p className="text-text-secondary mt-2">
                      Correct answer: {currentQuestion.correctAnswer}
                    </p>
                  )}
                </div>

                <motion.button
                  onClick={handleNextQuestion}
                  className="w-full py-4 bg-accent-primary text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight size={20} />
                    </>
                  ) : (
                    'See Results'
                  )}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
