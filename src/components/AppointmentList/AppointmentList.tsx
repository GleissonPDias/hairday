import { useState } from "react";
import type { Appointment } from "../../types/appointment";
import { PERIODS, filterByDate, groupByPeriod } from "../../utils/appointment";
import { PeriodSection } from "../PeriodSection";

type AppointmentListProps = {
  appointments: Appointment[];
  onDelete: (id: string) => void;
};

// Retorna a data de hoje no formato ISO (YYYY-MM-DD).
function getTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Área da agenda: cabeçalho, seletor de data e períodos.
export function AppointmentList({ appointments, onDelete }: AppointmentListProps) {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayISO());

  const filtered = filterByDate(appointments, selectedDate);
  const grouped = groupByPeriod(filtered);

  return (
    <section className="space-y-6 py-2 lg:py-0">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Sua agenda</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Consulte os seus cortes de cabelo agendados por dia
          </p>
        </div>
        <div className="relative w-full sm:w-auto">
          <label htmlFor="schedule-date" className="sr-only">
            Data da agenda
          </label>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#b8952e]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <input
            id="schedule-date"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-10 pr-3 text-sm text-zinc-900 focus:border-[#b8952e] focus:outline-none focus:ring-1 focus:ring-[#b8952e] dark:border-[#3a393e] dark:bg-[#1c1b1f] dark:text-zinc-200 sm:w-44"
          />
        </div>
      </header>

      <div className="space-y-4">
        {PERIODS.map((period) => (
          <PeriodSection
            key={period.key}
            period={period}
            appointments={grouped[period.key]}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}