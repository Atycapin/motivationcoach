import React from "react";
import { useAppContext } from "../context/AppContext";
import { CONFIG, Icons } from "../config";

const PathwayTracker = ({ navigateTo }) => {
  const { activePathway, completePathwayTask } = useAppContext();

  if (!activePathway) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg border text-center">
        <h3 className="font-bold text-xl mb-2 text-gray-800">
          Aucun Parcours Actif
        </h3>
        <button
          onClick={() => navigateTo("pathways")}
          className="text-purple-600 font-semibold hover:underline"
        >
          Choisir un parcours guidé
        </button>
      </div>
    );
  }

  const pathway = CONFIG.pathways[activePathway.pathwayId];
  const currentWeekTasks = pathway.plan[activePathway.currentWeek];
  const completedTasks = activePathway.completedTasks;

  const handleTaskClick = (task) => {
    if (completedTasks.includes(task.id)) return;

    if (task.type === "tool") {
      navigateTo("toolbox");
    }
    // L'action de cliquer sur la tâche la complète
    completePathwayTask(task.id);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border">
      <h3 className="font-bold text-xl mb-1 text-gray-800">
        Mon Parcours Actif
      </h3>
      <p className="text-sm text-purple-700 font-semibold mb-4">
        {pathway.title}
      </p>
      <h4 className="font-semibold text-gray-600 mb-3">
        Objectifs de la semaine {activePathway.currentWeek + 1}
      </h4>
      <div className="space-y-3">
        {currentWeekTasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          return (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={`flex items-center p-3 rounded-lg transition-all border-2 ${
                isCompleted
                  ? "bg-emerald-50 border-emerald-200 text-gray-500 line-through"
                  : "bg-gray-50 border-gray-200 hover:border-purple-300 cursor-pointer"
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
              <span className="flex-1 text-sm">{task.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(PathwayTracker);
