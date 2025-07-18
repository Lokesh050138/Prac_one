import { useEffect, useState } from "react";
import TextToSpeech from "./TextToSpeech";
import Speech_to_text from "./Speech_to_text";
import sunIcon from "../assets/sun.png";
import moonIcon from "../assets/moon.png";

function Toggle() {
  const [activeFeature, setActiveFeature] = useState("stt");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const featureButtonClass = (feature) =>
    `px-6 py-2 rounded-full font-medium transition duration-300 ${
      activeFeature === feature
        ? "bg-blue-600 text-white shadow"
        : "bg-white text-gray-900 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    }`;

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="w-full flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700 shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">༼ ◕_◕ ༽Vocana</h1>
        <button
          onClick={toggleTheme}
          className="hover:scale-110 transition-transform duration-300"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          <img
            src={theme === "dark" ? sunIcon : moonIcon}
            alt="Toggle Theme"
            className="w-10 h-10 p-1 rounded-lg shadow-sm shadow-gray-500"
          />
        </button>
      </header>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 my-6 pt-4">
        <button
          className={featureButtonClass("stt")}
          onClick={() => setActiveFeature("stt")}
        >
          Speech to Text
        </button>
        <button
          className={featureButtonClass("tts")}
          onClick={() => setActiveFeature("tts")}
        >
          Text to Speech
        </button>
      </div>

      {/* Render Selected Component */}
      <main className="px-4 pb-10">
        {activeFeature === "stt" ? <Speech_to_text /> : <TextToSpeech />}
      </main>
    </div>
  );
}

export default Toggle;
