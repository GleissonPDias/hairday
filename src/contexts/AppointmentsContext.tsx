import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Appointment } from "../types/appointment";
import { generateId } from "../utils/appointment";

const STORAGE_KEY = "hairday:appointments";

// Carrega agendamentos salvos no localStorage (com fallback seguro).
function loadAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Appointment[]) : [];
  } catch {
    return [];
  }
}

// Tipo do valor exposto pelo Context.
export type AppointmentsContextValue = {
  appointments: Appointment[];
  addAppointment: (data: Omit<Appointment, "id">) => boolean;
  removeAppointment: (id: string) => void;
};

// Context criado com valor inicial undefined para detectar uso fora do Provider.
const AppointmentsContext = createContext<AppointmentsContextValue | undefined>(
  undefined
);

// Provider que centraliza o estado dos agendamentos.
export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(loadAppointments);

  // Persiste os agendamentos no localStorage sempre que a lista mudar.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  // Cadastro imutável: impede dois clientes no mesmo horário e data.
  // Retorna true se cadastrou, ou false se já existir conflito.
  const addAppointment = useCallback(
    (data: Omit<Appointment, "id">): boolean => {
      const conflict = appointments.some(
        (appointment) =>
          appointment.date === data.date && appointment.time === data.time
      );
      if (conflict) {
        return false;
      }
      const newAppointment: Appointment = {
        id: generateId(),
        ...data,
      };
      setAppointments((previous) => [...previous, newAppointment]);
      return true;
    },
    [appointments]
  );

  // Exclusão imutável: remove apenas o registro com o ID informado.
  const removeAppointment = useCallback((id: string) => {
    setAppointments((previous) =>
      previous.filter((appointment) => appointment.id !== id)
    );
  }, []);

  const value: AppointmentsContextValue = {
    appointments,
    addAppointment,
    removeAppointment,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

// Hook próprio para consumir o Context com erro claro fora do Provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useAppointments(): AppointmentsContextValue {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error(
      "useAppointments deve ser usado dentro de um AppointmentsProvider."
    );
  }
  return context;
}