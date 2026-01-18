"use client";
import { useEffect, useState } from "react";
import SocietyLanding from "./home/landing";
import SetupScreen from "./home/setup";

// TODO: Replace demo or environment-based landing logic
// TODO: Implement setup-driven landing flow
// TODO: Create a helper function to check if society setup exists
// TODO: If setup exists, render SocietyLanding
// TODO: If setup does not exist, render SetupScreen
// TODO: Keep this logic simple and environment-agnostic

/**
 * Helper function to check if society setup is complete.
 * TODO: Setup is considered complete when a society config record exists
 * TODO: This check may later call an API or read persisted config
 * @param {object} config - The config object from the API
 * @returns {boolean} - True if setup is complete, false otherwise
 */
function isSetupComplete(config) {
  // Setup is complete if config exists and has a society name
  return config && config.societyName && config.mode === "production";
}

export default function Home() {
  const [setupComplete, setSetupComplete] = useState(null);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((config) => {
        setSetupComplete(isSetupComplete(config));
      })
      .catch(() => {
        // If config fetch fails, assume setup is not complete
        setSetupComplete(false);
      });
  }, []);

  // Loading state
  if (setupComplete === null) return null;

  // If setup does not exist, render SetupScreen
  if (!setupComplete) {
    return <SetupScreen />;
  }

  // If setup exists, render SocietyLanding
  return <SocietyLanding />;
}
