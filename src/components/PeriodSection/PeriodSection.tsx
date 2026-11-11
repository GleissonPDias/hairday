import type { Period } from "../../types/appointment";
import type { Appointment } from "../../types/appointment";
import { AppointmentItem } from "../AppointmentItem";
import { EMPTY_PERIOD_MESSAGE, PERIOD_RANGES } from "../../utils/appointment";

type PeriodSectionProps = {
  period: Period;
  appointments: Appointment[];
  onDelete: (id: string) => void;
};

function PeriodIcon({ periodKey }: { periodKey: Period["key"] }) {
  if (periodKey === "morning") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b8952e]" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" /><path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" /><path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      </svg>
    );
  }
  if (periodKey === "afternoon") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b8952e]" aria-hidden="true">
        <path d="M12 2v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="M20 12h2" />
        <path d="m19.07 4.93-1.41 1.41" /><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
        <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b8952e]" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

// Renderiza um período: cabeçalho, lista ordenada ou mensagem de vazio.
export function PeriodSection({
  period,
  appointments,
  onDelete,
}: PeriodSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-[#2f2e33] dark:bg-[#232225]">
      <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-[#2f2e33]">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <PeriodIcon periodKey={period.key} />
          <span>{period.label}</span>
        </div>
        <span className="text-xs text-zinc-500">{PERIOD_RANGES[period.key]}</span>
      </header>

      {appointments.length === 0 ? (
        <p className="px-4 py-5 text-sm text-zinc-500">
          {EMPTY_PERIOD_MESSAGE}
        </p>
      ) : (
        <ul className="divide-y divide-zinc-200 dark:divide-[#2f2e33]">
          {appointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}