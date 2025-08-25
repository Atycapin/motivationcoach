import React from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";

const AppContent = () => {
  const { profile } = useAppContext();
  return profile.onboardingComplete ? <Dashboard /> : <Onboarding />;
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
