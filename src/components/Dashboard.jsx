import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Icons } from "../config";
import ChallengeView from "./ChallengeView";
import JournalView from "./JournalView";
import ToolboxView from "./ToolboxView";
import PathwaysHub from "./PathwaysHub";
import DailyCheckin from "./DailyCheckin";
import PathwayTracker from "./PathwayTracker";
import Notification from "./Notification";
import FocusMode from "./FocusMode";

const reminderMessages = [
  "Hey, juste un petit rappel pour te recentrer. N'oublie pas :",
  "Parfois, le plus dur est de commencer. Souviens-toi de ta motivation :",
  "Sur le point de laisser tomber ? Relis ça :",
];

const Dashboard = () => {
  const { profile } = useAppContext();
  const [activeView, setActiveView] = useState("challenges");
  const [notification, setNotification] = useState(null);
  const [focusTask, setFocusTask] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (document.hidden && profile.motto) {
        const randomMessage =
          reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
        setNotification(`${randomMessage} "${profile.motto}"`);
      }
    }, 120000); // 2 minutes for demo
    return () => clearTimeout(timer);
  }, [profile.motto]);

  const handleFocusComplete = () => {
    console.log(`Tâche terminée : ${focusTask.name}`);
    setFocusTask(null);
  };

  const navigateTo = (view) => setActiveView(view);

  const renderActiveView = () => {
    switch (activeView) {
      case "challenges":
        return <ChallengeView onStartFocus={setFocusTask} />;
      case "journal":
        return <JournalView />;
      case "toolbox":
        return <ToolboxView />;
      case "pathways":
        return <PathwaysHub />;
      default:
        return <ChallengeView onStartFocus={setFocusTask} />;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-slate-50">
      {notification && (
        <Notification
          message={notification}
          onDismiss={() => setNotification(null)}
        />
      )}
      {focusTask && (
        <FocusMode
          taskName={focusTask.name}
          onComplete={handleFocusComplete}
          onExit={() => setFocusTask(null)}
        />
      )}

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border text-center">
            <h2 className="text-2xl font-bold">Bonjour, {profile.name} !</h2>
          </div>
          <nav className="bg-white p-4 rounded-2xl shadow-lg border space-y-2">
            <button
              onClick={() => navigateTo("challenges")}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${
                activeView === "challenges"
                  ? "bg-purple-100 text-purple-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icons.Target /> Défis
            </button>
            <button
              onClick={() => navigateTo("pathways")}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${
                activeView === "pathways"
                  ? "bg-purple-100 text-purple-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icons.TrendingUp /> Parcours
            </button>
            <button
              onClick={() => navigateTo("journal")}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${
                activeView === "journal"
                  ? "bg-purple-100 text-purple-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icons.BookOpen /> Journal
            </button>
            <button
              onClick={() => navigateTo("toolbox")}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${
                activeView === "toolbox"
                  ? "bg-purple-100 text-purple-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icons.Shield /> Boîte à Outils
            </button>
          </nav>
          <PathwayTracker navigateTo={navigateTo} />
          <DailyCheckin />
        </aside>
        <main className="lg:col-span-2">{renderActiveView()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
