import React, { useState, useEffect, useRef } from 'react';
import sunImg from '../assets/sun.png';
import moonImg from '../assets/moon.png';
import { Link, useLocation } from 'react-router-dom';


const TextToSpeech = () => {
  const location = useLocation();
  const [voices, setVoices] = useState([]);
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [theme, setTheme] = useState('dark');
  const [notification, setNotification] = useState('');
  const utteranceRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      if (synthVoices.length === 0) {
        setTimeout(loadVoices, 100);
        return;
      }
      const filtered = synthVoices.filter(v => v.lang && v.name);
      setVoices(filtered);
      setSelectedVoice(filtered[0]);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };

  const speak = () => {
    if (!text.trim()) {
      showNotification('❗ Please write some text first');
      return;
    }
    if (!selectedVoice) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;
    showNotification('🔊 Speaking...');
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    showNotification('🛑 Speech stopped');
  };

  const resetText = () => {
    setText('');
    showNotification('♻️ Text cleared');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const downloadSpeech = async () => {
    if (!text.trim()) {
      showNotification('❗ Please write some text first');
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tts_output.wav';
      link.click();
      URL.revokeObjectURL(url);
      showNotification('✅ Voice downloaded!');
    };

    mediaRecorder.start();
    setIsRecording(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = rate;

    utterance.onend = () => {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`min-h-screen font-sans font-semibold leading-loose flex items-center justify-center px-4 py-10 transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' : 'bg-gradient-to-br from-gray-500 via-white to-gray-600 text-gray-900'}`}>
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 focus:outline-none transition-transform duration-700 hover:scale-110"
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      >
        <img
          src={theme === 'dark' ? moonImg : sunImg}
          alt="Theme Icon"
          className={`rounded-lg p-1 w-10 h-10 transition-all duration-700 ease-in-out ${theme === 'dark' ? 'bg-slate-600 shadow-lg shadow-gray-600' : 'shadow-lg shadow-gray-600'}`}
        />
      </button>

      <div className={`w-full max-w-3xl ${theme === 'dark' ? 'bg-white/5 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} backdrop-blur-md rounded-2xl shadow-lg p-8 border`}>

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-gray-300 dark:bg-gray-700 p-1">
            <Link
              to="/text-to-speech"
              className={`px-2 py-1 rounded-full transition-all duration-300 ${location.pathname === '/text-to-speech'
                ? 'bg-white dark:bg-black text-white font-bold shadow'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                }`}
            >
              Text to Speech
            </Link>
            <Link
              to="/speech-to-text"
              className={`px-2 py-1 rounded-full transition-all duration-300 ${location.pathname === '/speech-to-text'
                ? 'bg-white dark:bg-black text-white font-bold shadow'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                }`}
            >
              Speech to Text
            </Link>
          </div>
        </div>


        <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-wider mb-4 text-cyan-400">
          Text to <span className={`rounded-lg p-2 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' : 'bg-gradient-to-br from-gray-400 via-white to-gray-400 text-gray-900'}`}>Speech</span>
        </h1>
        <p className="text-center mb-6">
          Type something and hear it spoken aloud.
        </p>

        {/* Text Area */}
        <textarea
          rows="4"
          className={`w-full p-4 rounded-lg text-lg border mb-6 shadow-inner ${theme === 'dark' ? 'bg-black/40 text-cyan-200 border-cyan-500' : 'bg-white text-gray-800 border-gray-300'}`}
          placeholder="Type something to speak..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Voice Selection */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Choose Voice:</label>
          <select
            className={`w-full px-4 py-2 rounded border focus:outline-none ${theme === 'dark' ? 'bg-black/30 text-cyan-200 border-cyan-400' : 'bg-white text-gray-800 border-gray-400'}`}
            onChange={(e) =>
              setSelectedVoice(voices.find(v => v.name === e.target.value))
            }
            value={selectedVoice?.name || ''}
          >
            {voices.map((voice, i) => (
              <option key={i} value={voice.name} className={theme === 'dark' ? 'bg-gray-900 text-cyan-200' : 'bg-white text-gray-800'}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Speed Control */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Voice Speed: {rate.toFixed(1)}x</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Notification */}
        <div className="h-6 text-center mb-4">
          {notification && (
            <span className="text-green-400 text-sm animate-pulse">{notification}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={speak}
            className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
          >
            🔊 Speak
          </button>

          <button
            onClick={stopSpeaking}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
          >
            🛑 Stop
          </button>

          <button
            onClick={resetText}
            className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
          >
            ♻️ Reset
          </button>

          <button
            onClick={downloadSpeech}
            disabled={isRecording}
            className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
          >
            🎧 Download Voice
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
