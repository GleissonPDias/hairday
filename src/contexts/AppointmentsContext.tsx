import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Appointment } from "../types/appointment";
import { generateId } from "../utils/appointment";

// Tipo do valor exposto pelo Context.
export type AppointmentsContextValue = {
  appointments: Appointment[];
  addAppointment: (data: Omit<Appointment, "id">) => void;
  removeAppointment: (id: string) => void;
};

// Context criado com valor inicial undefined para detectar uso fora do Provider.
const AppointmentsContext = createContext<AppointmentsContextValue | undefined>(
  undefined
);

// Provider que centraliza o estado dos agendamentos.
export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Cadastro imutável: cria novo array com o novo item.
  const addAppointment = useCallback((data: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      id: generateId(),
      ...data,
    };
    setAppointments((previous) => [...previous, newAppointment]);
  }, []);

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

