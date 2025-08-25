import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Icons } from "../config";

const FocusMode = ({ taskName, duration = 25, onComplete, onExit }) => {
  const { addPoints } = useAppContext();
  const totalSeconds = duration * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((time) => time - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      addPoints(25, `Session focus : ${taskName}`);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, addPoints, taskName, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalSeconds);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center z-50 text-white">
      <button
        onClick={onExit}
        className="absolute top-6 right-6 text-gray-400 hover:text-white"
      >
        <Icons.X size={32} />
      </button>
      <div className="text-center">
        <p className="text-xl text-gray-300 mb-2">Concentration sur :</p>
        <h2 className="text-4xl font-bold mb-12 truncate max-w-lg">
          {taskName}
        </h2>
        <div className="text-8xl font-mono mb-12">
          {minutes}:{seconds}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleTimer}
            className="px-8 py-4 bg-purple-600 rounded-lg text-xl font-bold hover:bg-purple-500 flex items-center gap-2"
          >
            {isActive ? <Icons.Pause size={24} /> : <Icons.Play size={24} />}{" "}
            {isActive ? "Pause" : "Démarrer"}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            <Icons.RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
