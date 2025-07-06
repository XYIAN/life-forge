"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";
import { DashboardProvider } from "./dashboard-provider";
import { DataProvider } from "./data-provider";

// Import PrimeReact CSS
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <DataProvider>{children}</DataProvider>
      </DashboardProvider>
    </ThemeProvider>
  );
};
