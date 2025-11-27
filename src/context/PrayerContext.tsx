// src/context/PrayerContext.tsx
import { createContext, useContext, useState } from "react";

type PageMode = "default" | "azan" | "iqomah";

interface PrayerContextType {
  pageMode: PageMode;
  setPageMode: (m: PageMode) => void;

  iqomahTimer: number;
  setIqomahTimer: (v: number) => void;
}

const PrayerContext = createContext<PrayerContextType | null>(null);

export function PrayerProvider({ children }: { children: React.ReactNode }) {
  const [pageMode, setPageMode] = useState<PageMode>("default");
  const [iqomahTimer, setIqomahTimer] = useState(0);

  return (
    <PrayerContext.Provider
      value={{
        pageMode,
        setPageMode,
        iqomahTimer,
        setIqomahTimer,
      }}
    >
      {children}
    </PrayerContext.Provider>
  );
}

export function usePrayer() {
  const ctx = useContext(PrayerContext);
  if (!ctx) throw new Error("usePrayer must be used inside PrayerProvider");
  return ctx;
}
