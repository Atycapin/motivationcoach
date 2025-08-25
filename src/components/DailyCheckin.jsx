import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { Icons } from "../config";

const getTodayString = () => new Date().toISOString().split("T")[0];

const DailyCheckin = () => {
  const { rituals, ritualLog, energyLog, toggleRitualCompletion, logEnergy } =
    useAppContext();
  const today = useMemo(() => getTodayString(), []);
  const completedToday = ritualLog[today] || [];
  const energyLevel = energyLog[today] || 0;

  if (rituals.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border">
      <h3 className="font-bold text-xl mb-4 text-gray-800">Check-in du Jour</h3>
      <div className="mb-6">
        <h4 className="font-semibold text-gray-600 mb-3">
          Mes Rituels Quotidiens
        </h4>
        <div className="space-y-3">
          {rituals.map((ritual) => {
            const isCompleted = completedToday.includes(ritual.id);
            return (
              <div
                key={ritual.id}
                onClick={() => toggleRitualCompletion(ritual.id)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all border-2 ${
                  isCompleted
                    ? "bg-emerald-50 border-emerald-200 text-gray-500 line-through"
                    : "bg-gray-50 border-gray-200 hover:border-purple-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-gray-400"
                  }`}
                >
                  {isCompleted && (
                    <Icons.CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="mr-2">{ritual.icon}</span>
                <span className="flex-1">{ritual.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-600 mb-3">
          Mon Niveau d'Énergie
        </h4>
        <div className="flex justify-around items-center">
          {["😟", "😕", "😐", "🙂", "😃"].map((emoji, index) => {
            const level = index + 1;
            return (
              <button
                key={level}
                onClick={() => logEnergy(level)}
                className={`text-3xl p-2 rounded-full transition-transform duration-200 hover:scale-125 ${
                  energyLevel === level ? "bg-yellow-200 scale-125" : ""
                }`}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DailyCheckin);
