import React from "react";
import { useAppContext } from "../context/AppContext";
import { Icons } from "../config";

const ChallengeView = ({ onStartFocus }) => {
  const { challenges } = useAppContext();

  if (challenges.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-2xl shadow-lg border">
        <Icons.Target size={48} className="mx-auto text-gray-300" />
        <h3 className="mt-4 text-xl font-semibold">Aucun défi actif</h3>
        <p className="text-gray-500 mt-2">
          Ajoutez des défis ou démarrez un parcours pour commencer.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Défis Actifs</h2>
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="bg-white p-6 rounded-2xl shadow-lg border"
        >
          <h3 className="text-xl font-bold">{challenge.title}</h3>
          <div className="mt-4 space-y-2">
            {challenge.subGoals.map((sg, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>{sg}</span>
                <button
                  onClick={() => onStartFocus({ name: sg })}
                  title="Démarrer une session de concentration"
                  className="p-2 hover:bg-purple-100 rounded-full"
                >
                  <Icons.Play size={16} className="text-purple-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeView;
