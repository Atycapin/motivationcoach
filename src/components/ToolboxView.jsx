import React, { useState } from "react";

const FearSettingTool = () => {
  const [step, setStep] = useState(0);
  const [fear, setFear] = useState({
    define: "",
    prevent: "",
    repair: "",
    inaction: "",
  });
  const steps = [
    {
      title: "1. Définir la Peur",
      key: "define",
      placeholder:
        "Quel est le pire qui pourrait arriver si je faisais ce que je redoute ?",
    },
    {
      title: "2. Prévenir le Pire",
      key: "prevent",
      placeholder: "Que puis-je faire pour empêcher ce scénario ?",
    },
    {
      title: "3. Réparer les Dégâts",
      key: "repair",
      placeholder:
        "Si le pire arrivait, que pourrais-je faire pour y remédier ?",
    },
    {
      title: "4. Coût de l'Inaction",
      key: "inaction",
      placeholder:
        "Quels sont les coûts de ne rien faire dans 6 mois ? 1 an ? 3 ans ?",
    },
  ];
  const currentStep = steps[step];

  return (
    <div className="border p-6 rounded-lg bg-gray-50 mt-4">
      <h3 className="text-xl font-bold mb-4">Atelier : Définir ses Peurs</h3>
      <div className="mb-4">
        <h4 className="font-semibold text-indigo-700">{currentStep.title}</h4>
        <textarea
          value={fear[currentStep.key]}
          onChange={(e) =>
            setFear((prev) => ({ ...prev, [currentStep.key]: e.target.value }))
          }
          className="w-full mt-2 p-2 border rounded-md h-28"
          placeholder={currentStep.placeholder}
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Précédent
        </button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === step ? "bg-indigo-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Suivant
          </button>
        ) : (
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-md">
            Terminer l'atelier
          </button>
        )}
      </div>
    </div>
  );
};

const ToolboxView = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">
        Boîte à Outils Mentaux
      </h2>
      <p className="text-gray-600">
        Utilisez ces ateliers guidés pour clarifier vos pensées et surmonter les
        blocages.
      </p>
      <div className="bg-white p-6 rounded-2xl shadow-lg border">
        <FearSettingTool />
      </div>
    </div>
  );
};

export default ToolboxView;
