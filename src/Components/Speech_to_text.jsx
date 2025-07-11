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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-700">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-cyan-400 tracking-wider mb-4">
                    🎙️ Speech to Text
                </h1>
                <p className="text-center text-gray-300 mb-6">
                    Speak into your microphone and watch your words turn into text.
                </p>

                {/* Language Dropdown */}
                <div className="flex justify-center mb-6">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-4 py-2 rounded bg-black/30 text-cyan-200 border border-cyan-400 focus:outline-none"
                    >
                        <option value="en-IN">English (India)</option>
                        <option value="en-US">English (US)</option>
                        <option value="hi-IN">Hindi (हिन्दी)</option>
                        <option value="ja-JP">Japanese (日本語)</option>
                        <option value="ko-KR">Korean (한국어)</option>
                    </select>
                </div>

                {/* Transcript Box */}
                <div className="bg-black/40 rounded-lg p-4 h-48 overflow-y-auto text-lg text-cyan-200 border border-cyan-500 mb-6 shadow-inner">
                    {transcript || <span className="text-gray-500">Your speech will appear here...</span>}
                </div>

                {/* Fixed-height Copied Notification Section */}
                <div className="h-6 text-center mb-4">
                    {copied && (
                        <span className="text-green-400 text-sm animate-pulse">✅ Copied to clipboard!</span>
                    )}
                </div>

                {/* Control Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleCopy}
                        className="px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-shadow duration-300 shadow-cyan-500/50 hover:shadow-lg"
                    >
                        Copy
                    </button>
                    <button
                        onClick={resetTranscript}
                        className="px-5 py-2 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-shadow duration-300 shadow-yellow-500/50 hover:shadow-lg"
                    >
                        Reset
                    </button>
                    <button
                        onClick={startListening}
                        className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-500 transition-shadow duration-300 shadow-green-500/50 hover:shadow-lg"
                    >
                        Start Listening
                    </button>
                    <button
                        onClick={stopListening}
                        className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 transition-shadow duration-300 shadow-red-500/50 hover:shadow-lg"
                    >
                        Stop Listening
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Speech_to_text;
