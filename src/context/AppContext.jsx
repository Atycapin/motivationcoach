import React, { createContext, useContext, useCallback } from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import { CONFIG } from "../config";

// --- 1. Création du Contexte ---
// On crée un "espace" global pour stocker toutes nos données.
const AppContext = createContext();

// --- Utilitaire ---
// Fonction pour obtenir la date du jour au format YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split("T")[0];

// --- 2. Provider du Contexte ---
// C'est le composant qui va "fournir" les données à toute l'application.
export const AppProvider = ({ children }) => {
  // --- 3. Définition des États ---
  // On utilise notre hook personnalisé usePersistentState pour que tout soit sauvegardé automatiquement.

  // Données de l'utilisateur et du profil
  const [profile, setProfile] = usePersistentState("profile", {
    onboardingComplete: false,
    fears: [],
    goals: [],
    why: "",
    name: "Utilisateur",
    motto: "",
  });
  const [userStats, setUserStats] = usePersistentState("userStats", {
    totalPoints: 0,
  });

  // Données liées aux fonctionnalités principales
  const [challenges, setChallenges] = usePersistentState("challenges", []);
  const [journal, setJournal] = usePersistentState("journal", []);
  const [rituals, setRituals] = usePersistentState("rituals", []);
  const [ritualLog, setRitualLog] = usePersistentState("ritualLog", {}); // Ex: { '2025-08-24': ['id_rituel_1'] }
  const [energyLog, setEnergyLog] = usePersistentState("energyLog", {}); // Ex: { '2025-08-24': 4 }

  // Données pour les Parcours Guidés
  const [activePathway, setActivePathway] = usePersistentState(
    "activePathway",
    null
  );

  // --- 4. Fonctions de Logique Métier ---
  // Toutes les actions que l'utilisateur peut faire.
  // On utilise "useCallback" pour optimiser les performances.

  // Ajoute des points au score de l'utilisateur
  const addPoints = useCallback((points, reason) => {
    setUserStats((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
    }));
    console.log(`+${points} points pour : ${reason}`);
  }, []);

  // Finalise l'inscription et initialise les défis
  const completeOnboarding = useCallback((onboardingData) => {
    setProfile({ ...onboardingData, onboardingComplete: true });
    const initialChallenges = onboardingData.goals.flatMap(
      (goal) => CONFIG.challenges[goal] || []
    );
    setChallenges(initialChallenges);
  }, []);

  // Ajoute une nouvelle entrée au journal
  const addJournalEntry = useCallback((entry) => {
    setJournal((prev) => [
      { id: Date.now(), date: new Date(), ...entry },
      ...prev,
    ]);
  }, []);

  // Marque un rituel comme complété/incomplet pour aujourd'hui
  const toggleRitualCompletion = useCallback(
    (ritualId) => {
      const today = getTodayString();
      const todayLog = ritualLog[today] || [];
      const isCompleted = todayLog.includes(ritualId);
      let newLog = isCompleted
        ? todayLog.filter((id) => id !== ritualId)
        : [...todayLog, ritualId];
      if (!isCompleted) addPoints(5, "Rituel complété");
      setRitualLog((prev) => ({ ...prev, [today]: newLog }));
    },
    [ritualLog, addPoints]
  );

  // Enregistre le niveau d'énergie du jour
  const logEnergy = useCallback((level) => {
    setEnergyLog((prev) => ({ ...prev, [getTodayString()]: level }));
  }, []);

  // Démarre un nouveau Parcours Guidé
  const startPathway = useCallback(
    (pathwayId) => {
      const pathway = CONFIG.pathways[pathwayId];
      if (!pathway) return;

      setActivePathway({
        pathwayId,
        startDate: new Date().toISOString(),
        currentWeek: 0,
        completedTasks: [],
      });

      // Ajoute les rituels de la première semaine à la liste de l'utilisateur s'ils n'y sont pas déjà
      const firstWeekTasks = pathway.plan[0];
      const userRitualIds = new Set(rituals.map((r) => r.id));
      const ritualsToAdd = [];

      firstWeekTasks.forEach((task) => {
        if (
          task.type === "ritual" &&
          task.ritual &&
          !userRitualIds.has(task.ritual.id)
        ) {
          ritualsToAdd.push(task.ritual);
        }
      });
      if (ritualsToAdd.length > 0)
        setRituals((prev) => [...prev, ...ritualsToAdd]);
    },
    [rituals]
  );

  // Marque une tâche d'un parcours comme complétée
  const completePathwayTask = useCallback(
    (taskId) => {
      if (!activePathway || activePathway.completedTasks.includes(taskId))
        return;

      setActivePathway((prev) => ({
        ...prev,
        completedTasks: [...prev.completedTasks, taskId],
      }));

      const pathway = CONFIG.pathways[activePathway.pathwayId];
      const task = pathway.plan.flat().find((t) => t.id === taskId);
      if (task?.points) {
        addPoints(task.points, `Tâche de parcours : ${task.title}`);
      }
    },
    [activePathway, addPoints]
  );

  // --- 5. Valeur du Contexte ---
  // On regroupe toutes les données et fonctions pour les rendre disponibles
  const value = {
    profile,
    challenges,
    userStats,
    journal,
    rituals,
    ritualLog,
    energyLog,
    activePathway,
    addPoints,
    completeOnboarding,
    addJournalEntry,
    toggleRitualCompletion,
    logEnergy,
    startPathway,
    completePathwayTask,
    setRituals,
    setChallenges,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- 6. Hook d'accès au Contexte ---
// Un raccourci simple pour que les composants puissent accéder aux données facilement.
export const useAppContext = () => {
  return useContext(AppContext);
};
