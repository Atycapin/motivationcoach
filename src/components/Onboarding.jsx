import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CONFIG } from "../config";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    fears: [],
    goals: [],
    why: "",
    motto: "",
  });
  const { completeOnboarding } = useAppContext();

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-3xl font-bold text-center">
              Bienvenue sur MotivationHub
            </h2>
            <p className="mt-4 text-gray-600 text-center">
              Prêt à transformer vos objectifs en réussites ?
            </p>
            <input
              type="text"
              placeholder="Comment devrions-nous vous appeler ?"
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-3 border rounded-lg mt-6"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="font-semibold text-xl mb-4">
              Votre phrase de motivation personnelle ?
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Nous vous la rappellerons pour vous re-motiver.
            </p>
            <input
              type="text"
              placeholder="Ex: 'Un pas après l'autre.'"
              value={data.motto}
              onChange={(e) =>
                setData((prev) => ({ ...prev, motto: e.target.value }))
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="font-semibold text-xl mb-4">
              Quel est votre objectif principal ? (choisissez-en un pour
              commencer)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {CONFIG.goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setData((prev) => ({ ...prev, goals: [g] }))}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    data.goals.includes(g)
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-50"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="min-h-[200px] flex flex-col justify-center">
          {renderStep()}
        </div>
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="px-6 py-2 bg-gray-200 rounded-lg"
            >
              Précédent
            </button>
          )}
          {step < 3 && (
            <button
              onClick={handleNext}
              disabled={!data.name || (step === 2 && !data.motto)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg ml-auto disabled:opacity-50"
            >
              Suivant
            </button>
          )}
          {step === 3 && (
            <button
              onClick={() => completeOnboarding(data)}
              disabled={data.goals.length === 0}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg ml-auto disabled:opacity-50"
            >
              Terminer et commencer !
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
