import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function Speech_to_text() {
  const [language, setLanguage] = useState('en-IN');
  const [copied, setCopied] = useState(false);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language });
  const stopListening = () => SpeechRecognition.stopListening();

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p className="text-center text-red-500">Browser doesn't support speech recognition.</p>
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-sans flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-white/5 border dark:border-gray-700 backdrop-blur-md rounded-2xl shadow-lg p-8 text-gray-900 dark:text-white transition-all duration-300">
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
            className="px-4 py-2 rounded bg-white dark:bg-black/30 text-gray-800 dark:text-cyan-200 border border-gray-300 dark:border-cyan-400 focus:outline-none"
          >
            <option value="en-IN" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>English (India)</option>
            <option value="en-US" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>English (US)</option>
            <option value="hi-IN" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>Hindi (हिन्दी)</option>
            <option value="ja-JP" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>Japanese (日本語)</option>
            <option value="ko-KR" className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200'>Korean (한국어)</option>
          </select>
        </div>

        {/* Transcript Box */}
        <div className="bg-gray-100 dark:bg-black/40 rounded-lg p-4 h-48 overflow-y-auto text-lg text-gray-800 dark:text-cyan-200 border border-gray-300 dark:border-cyan-500 mb-6 shadow-inner">
          {transcript || <span className="text-gray-400 dark:text-gray-500">Your speech will appear here...</span>}
        </div>

        {/* Notification */}
        <div className="h-6 text-center mb-4">
          {copied && (
            <span className="text-green-500 dark:text-green-400 text-sm animate-pulse">✅ Copied to clipboard!</span>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleCopy}
            className="px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition-shadow duration-300 shadow-cyan-500/50 hover:shadow-lg"
          >
            Copy
          </button>
          <button
            onClick={resetTranscript}
            className="px-5 py-2 rounded-full bg-yellow-600 hover:bg-yellow-500 text-white transition-shadow duration-300 shadow-yellow-500/50 hover:shadow-lg"
          >
            Reset
          </button>
          <button
            onClick={startListening}
            className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-500 text-white transition-shadow duration-300 shadow-green-500/50 hover:shadow-lg"
          >
            Start Listening
          </button>
          <button
            onClick={stopListening}
            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white transition-shadow duration-300 shadow-red-500/50 hover:shadow-lg"
          >
            Stop Listening
          </button>
        </div>
      </div>
    </div>
  )
}

export default Speech_to_text;
