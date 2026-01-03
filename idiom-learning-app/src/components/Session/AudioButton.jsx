import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import useSpeech from '../../hooks/useSpeech';

export default function AudioButton({ text, disabled = false }) {
  const { speak, isSpeaking, isSupported } = useSpeech();

  if (!isSupported) {
    return (
      <button
        disabled
        className="p-2 rounded-full bg-bg-tertiary opacity-50 cursor-not-allowed"
        title="Text-to-speech not supported"
      >
        <VolumeX size={20} className="text-text-secondary" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={() => speak(text)}
      disabled={disabled || isSpeaking}
      className={`p-2 rounded-full transition-colors ${
        isSpeaking
          ? 'bg-accent-primary animate-pulse'
          : 'bg-accent-primary hover:bg-blue-600'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={!disabled && !isSpeaking ? { scale: 1.1 } : {}}
      whileTap={!disabled && !isSpeaking ? { scale: 0.95 } : {}}
      title="Listen to pronunciation"
    >
      <Volume2 size={20} className="text-white" />
    </motion.button>
  );
}
