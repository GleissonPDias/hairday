import { useEffect, useState } from "react";
import { useAppointments } from "./contexts/AppointmentsContext";
import { ScheduleSidebar } from "./components/ScheduleSidebar";
import { AppointmentForm } from "./components/AppointmentForm";
import { AppointmentList } from "./components/AppointmentList";

type Theme = "light" | "dark";

const THEME_KEY = "hairday:theme";

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignora
  }
  return "dark";
}

function AppContent() {
  const { appointments, addAppointment, removeAppointment } = useAppointments();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignora
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-6 text-zinc-900 transition-colors dark:bg-[#141316] dark:text-zinc-200 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-start">
        <ScheduleSidebar theme={theme} onToggleTheme={toggleTheme}>
          <AppointmentForm onAdd={addAppointment} />
        </ScheduleSidebar>

        <main className="min-w-0 flex-1">
          <AppointmentList
            appointments={appointments}
            onDelete={removeAppointment}
          />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}