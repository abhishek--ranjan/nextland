"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import UtilityBar from './UtilityBar';
import Navigation from './Navigation';

export default function ConditionalHeader() {
  const pathname = usePathname();
  const [setupComplete, setSetupComplete] = useState(null);
  
  useEffect(() => {
    // Check if setup is complete
    fetch("/api/config")
      .then((res) => res.json())
      .then((config) => {
        const isComplete = config && config.societyName && config.mode === "production";
        setSetupComplete(isComplete);
      })
      .catch(() => {
        setSetupComplete(false);
      });
  }, []);
  
  // Hide header on setup-society pages
  const isSetupSocietyPage = pathname?.startsWith('/setup-society');
  
  // Hide header on root page if setup is not complete (SetupScreen is shown)
  const isRootSetupPage = pathname === '/' && setupComplete === false;
  
  // Hide header on admin pages and login page
  const isAdminPage = pathname?.startsWith('/admin');
  const isLoginPage = pathname?.startsWith('/login');
  
  if (isSetupSocietyPage || isRootSetupPage || isAdminPage || isLoginPage) {
    return null;
  }
  
  return (
    <>
      <UtilityBar />
      <Navigation />
    </>
  );
}
