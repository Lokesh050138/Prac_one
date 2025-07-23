import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaStop, FaRegCopy, FaRedo } from 'react-icons/fa';

function Speech_to_text() {
  const [language, setLanguage] = useState('en-IN');
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p className="text-center text-red-500">Browser doesn't support speech recognition.</p>;
  }

  const handleCopy = () => {
    if (!transcript.trim()) {
      showNotification('❗ Nothing to copy');
      return;
    }

    navigator.clipboard.writeText(transcript);
    showNotification('✅ Copied to clipboard!');
  };

  const handleStart = () => {
    if (listening) {
      showNotification('⚠️ Already listening');
      return;
    }

    SpeechRecognition.startListening({ continuous: true, language });
    showNotification('🎙️ Listening...');
  };

  const handleStop = () => {
    if (!listening) {
      showNotification('⚠️ Not listening');
      return;
    }

    SpeechRecognition.stopListening();
    showNotification('🛑 Stopped Listening');
  };

  const handleReset = () => {
    if (!transcript.trim()) {
      showNotification('⚠️ Transcript already empty');
      return;
    }

    resetTranscript();
    showNotification('♻️ Transcript cleared');
  };

  return (
    <div className="font-sans flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 text-gray-900 dark:text-white transition-all duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-wider mb-4 dark:border-gray-700">
          Speech to <span className="bg-gradient-to-br from-blue-200 to-blue-500 text-white rounded px-2 py-1 dark:from-gray-900 dark:to-black">Text</span>
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Speak into your microphone and watch your words turn into text.
        </p>

        {/* Language Dropdown */}
        <div className="flex justify-center mb-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 rounded bg-white dark:bg-black/30 text-gray-800 dark:text-cyan-200 border dark:border-gray-700 focus:outline-none"
          >
            <option value="en-IN" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>English (India)</option>
            <option value="en-US" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>English (US)</option>
            <option value="hi-IN" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>Hindi (हिन्दी)</option>
            <option value="ja-JP" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>Japanese (日本語)</option>
            <option value="ko-KR" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>Korean (한국어)</option>
          </select>
        </div>

        {/* Transcript Box */}
        <div className="bg-gray-100 dark:bg-black/40 rounded-lg p-4 h-48 overflow-y-auto text-lg text-gray-800 dark:text-cyan-200 mb-6 shadow-inner">
          {transcript || <span className="text-gray-400 dark:text-gray-500">Your speech will appear here...</span>}
        </div>

        {/* Notification */}
        <div className="h-6 text-center mb-4">
          {notification && (
            <span className="text-green-500 dark:text-green-400 text-sm animate-pulse">{notification}</span>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleCopy}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <FaRegCopy className="mr-2 mb-1 text-[18px]" />
            Copy
          </button>

          <button
            onClick={handleReset}
            className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700"
          >
            <FaRedo className="mr-2 mb-1 text-[18px]" />
            Reset
          </button>

          <button
            onClick={handleStart}
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700"
          >
            <FaMicrophone className="mr-2 mb-1 text-[18px]" />
            Start Listening
          </button>

          <button
            onClick={handleStop}
            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700"
          >
            <FaStop className="mr-2 mb-1 text-[18px]" />
            Stop Listening
          </button>
        </div>
      </div>
    </div>
  );
}

export default Speech_to_text;
