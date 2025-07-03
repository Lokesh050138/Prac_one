import React, { useState } from "react";

const Speech_to_text = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    const startListening = () => {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setText((prev) => prev + transcript + " ");
                } else {
                    interimTranscript += transcript;
                }
            }
        };
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">🎤 Speech to Text</h1>
            <div className="space-x-4 mb-6">
                <button
                    onClick={startListening}
                    disabled={isListening}
                    className={`px-4 py-2 rounded-lg font-semibold ${isListening ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                >
                    Start Listening
                </button>
                <button
                    onClick={stopListening}
                    disabled={!isListening}
                    className={`px-4 py-2 rounded-lg font-semibold ${!isListening ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                >
                    Stop Listening
                </button>
            </div>
            <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">
                    <strong>Transcript:</strong> {text || "Start speaking to see the transcript..."}
                </p>
            </div>
        </div>
    );
};

export default Speech_to_text;
