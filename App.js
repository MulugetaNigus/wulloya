import React, { useEffect, useState } from "react";
import AppNavigator from "./WulloyeApp/WulloyeMainNavigator/WulloyeNavigation";
import Onboard from "./WulloyeApp/Onboarding/Onboard";
// import HomeStack from './WulloyeApp/WulloyeMainNavigator/WulloyeNavigation'

export default function App() {
  // onboarding seen
  const [Onboarding, setOnboarding] = useState(true);

  // onboarding schedules
  useEffect(() => {
    setTimeout(() => {
      setOnboarding(false);
    }, 3000);
  }, []);

  return Onboarding ? <Onboard /> : <AppNavigator /> ;
}
