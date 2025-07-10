import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Link, useLocation } from 'react-router-dom';



// Import PNG icons
import sunImg from '../assets/sun.png';
import moonImg from '../assets/moon.png';

function Speech_to_text() {
    const [language, setLanguage] = useState('en-IN');
    const [notification, setNotification] = useState('');
    const [theme, setTheme] = useState('dark');
    const location = useLocation();


    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language });
        showNotification("🎤 Listening started");
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        showNotification("🛑 Listening stopped");
    };

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <p className="text-center text-red-500">Browser doesn't support speech recognition.</p>
    }

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 2000);
    };

    const handleCopy = () => {
    try {
        navigator.clipboard.writeText(transcript);
        showNotification("✅ Copied to clipboard!");
    } catch (err) {
        showNotification("❌ Failed to copy");
    }
};


    const handleReset = () => {
        resetTranscript();
        showNotification("♻️ Transcript reset");
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);


    return (
        <div className={`min-h-screen font-sans font-semibold leading-loose flex items-center justify-center px-4 py-10 transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' : 'bg-gradient-to-br from-gray-500 via-white to-gray-600 text-gray-900'}`}>
            {/* Theme Toggle Button with PNG Icons */}
            <button
                onClick={toggleTheme}
                className="absolute top-4 right-4 focus:outline-none transition-transform duration-700 hover:scale-110"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
                <img
                    src={theme === 'dark' ? moonImg : sunImg}
                    alt={theme === 'dark' ? 'Moon Icon' : 'Sun Icon'}
                    className={`rounded-lg p-1 w-10 h-10 transition-all duration-700 ease-in-out ${theme === 'dark' ? 'bg-slate-600 shadow-lg shadow-gray-600' : 'shadow-lg shadow-gray-600 '}`}
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
                    Speech to <span className={`rounded-lg p-2 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' : 'bg-gradient-to-br from-gray-400 via-white to-gray-400 text-gray-900'}`}>Text</span>
                </h1>
                <p className="text-center mb-6">
                    Speak into your microphone and watch your words turn into text.
                </p>

                {/* Language Dropdown */}
                <div className="flex justify-center mb-6">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-black/30 text-cyan-200 border-cyan-400' : 'bg-white text-gray-800 border-gray-400'} border focus:outline-none`}
                    // className="px-4 py-2 rounded bg-black/30 text-cyan-200 border border-cyan-400 focus:outline-none"
                    >
                        <option value="en-IN" className={`${theme === 'dark' ? 'bg-gray-900 text-cyan-200 border-cyan-400' : 'bg-white text-gray-800 border-gray-400'}`}>English (India)</option>
                        <option value="en-US" className={`${theme === 'dark' ? 'bg-gray-900 text-cyan-200 border-cyan-400' : 'bg-white text-gray-800 border-gray-400'}`}>English (US)</option>
                        <option value="hi-IN" className={`${theme === 'dark' ? 'bg-gray-900 text-cyan-200 border-cyan-400' : 'bg-white text-gray-800 border-gray-400'}`}>Hindi (हिन्दी)</option>
                        <option value="ja-JP" className={`${theme === 'dark' ? 'bg-gray-900 text-cyan-200 border-cyan-400' : 'bg-white text-gray-800 border-gray-400'}`}>Japanese (日本語)</option>
                        <option value="ko-KR" className={`${theme === 'dark' ? 'bg-gray-900 text-cyan-200 border-cyan-400' : 'bg-white text-gray-800 border-gray-400'}`}>Korean (한국어)</option>
                    </select>
                </div>

                {/* Transcript Box */}
                <div className={`rounded-lg p-4 h-48 overflow-y-auto text-lg border mb-6 shadow-inner ${theme === 'dark' ? 'bg-black/40 text-cyan-200 border-cyan-500' : 'bg-white text-gray-800 border-gray-300'}`}>
                    {transcript || <span className="text-gray-500">Your speech will appear here...</span>}
                </div>

                {/* Notification Message */}
                <div className="h-6 text-center mb-4">
                    {notification && (
                        <span className="text-green-400 text-sm animate-pulse">{notification}</span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleCopy}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                       📑 Copy
                    </button>
                    <button
                        onClick={handleReset}
                        className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        ♻️ Reset
                    </button>
                    <button
                        onClick={startListening}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        🎤 Start Listening
                    </button>
                    <button
                        onClick={stopListening}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        🛑 Stop Listening
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Speech_to_text;
