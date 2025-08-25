import React from "react";
import { useAppContext } from "../context/AppContext";
import { CONFIG } from "../config";

const PathwaysHub = () => {
  const { activePathway, startPathway } = useAppContext();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Parcours Guidés</h2>
      <p className="text-gray-600">
        Choisissez un programme structuré pour atteindre vos objectifs plus
        rapidement. Votre parcours actif apparaîtra sur votre tableau de bord.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {Object.values(CONFIG.pathways).map((pathway) => (
          <div
            key={pathway.id}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 flex flex-col"
          >
            <h3 className="text-xl font-bold text-purple-800">
              {pathway.title}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              {pathway.durationWeeks} semaines
            </p>
            <p className="flex-grow text-gray-600 mt-2 mb-4">
              {pathway.description}
            </p>
            {activePathway?.pathwayId === pathway.id ? (
              <button
                disabled
                className="w-full mt-auto py-2 bg-gray-300 text-gray-500 rounded-lg font-semibold"
              >
                Parcours Actif
              </button>
            ) : (
              <button
                onClick={() => startPathway(pathway.id)}
                disabled={!!activePathway}
                className="w-full mt-auto py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {!!activePathway
                  ? "Un parcours est déjà en cours"
                  : "Commencer ce parcours"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathwaysHub;
