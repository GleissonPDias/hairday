import { useState } from "react";
import type { Appointment } from "../../types/appointment";
import { PERIODS } from "../../utils/appointment";

type AppointmentFormProps = {
  onAdd: (data: Omit<Appointment, "id">) => boolean;
};

type FormErrors = {
  clientName?: string;
  date?: string;
  time?: string;
  form?: string;
};

const TIME_SLOTS_BY_PERIOD: Record<string, string[]> = {
  morning: ["09:00", "10:00", "11:00", "12:00"],
  afternoon: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  evening: ["19:00", "20:00", "21:00"],
};

// Formulário de novo agendamento com validação e seleção de horário por botões.
export function AppointmentForm({ onAdd }: AppointmentFormProps) {
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (clientName.trim() === "") {
      nextErrors.clientName = "Informe o nome do cliente.";
    }
    if (date === "") {
      nextErrors.date = "Selecione uma data.";
    }
    if (time === "") {
      nextErrors.time = "Selecione um horário.";
    }
    return nextErrors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setTouched(true);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const added = onAdd({
      clientName: clientName.trim(),
      date,
      time,
    });

    if (!added) {
      setErrors({
        time: "Já existe um agendamento para esta data e horário.",
      });
      setTouched(true);
      return;
    }

    // Limpa nome e horário; mantém a data.
    setClientName("");
    setTime("");
    setErrors({});
    setTouched(false);
  }

  function handleDateChange(value: string) {
    setDate(value);
    if (errors.time === "Já existe um agendamento para esta data e horário.") {
      setErrors((prev) => ({ ...prev, time: undefined }));
    }
  }

  function handleTimeSelect(value: string) {
    setTime(value);
    if (errors.time === "Já existe um agendamento para esta data e horário.") {
      setErrors((prev) => ({ ...prev, time: undefined }));
    }
  }

  const hasEmptyFieldError =
    touched &&
    (!!errors.clientName ||
      errors.date === "Selecione uma data." ||
      errors.time === "Selecione um horário.");

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#b8952e] focus:outline-none focus:ring-1 focus:ring-[#b8952e] dark:border-[#3a393e] dark:bg-[#1c1b1f] dark:text-zinc-200 dark:placeholder-zinc-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Agende um atendimento
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Selecione data, horário e informe o nome do cliente para criar o
          agendamento
        </p>
      </div>

      {hasEmptyFieldError && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          Preencha todos os campos obrigatórios para agendar.
        </p>
      )}

      {/* DATA */}
      <div className="space-y-2">
        <label
          htmlFor="appointment-date"
          className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
        >
          Data
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#b8952e]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <input
            id="appointment-date"
            type="date"
            value={date}
            onChange={(event) => handleDateChange(event.target.value)}
            className={inputClass}
          />
        </div>
        {errors.date && <p className="text-xs text-red-500 dark:text-red-400">{errors.date}</p>}
      </div>

      {/* HORÁRIOS */}
      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Horários
        </legend>
        {PERIODS.map((period) => (
          <div key={period.key} className="space-y-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-500">{period.label}</p>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS_BY_PERIOD[period.key].map((slot) => {
                const selected = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleTimeSelect(slot)}
                    className={`rounded-md border px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#b8952e] focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-[#232225] ${
                      selected
                        ? "border-[#b8952e] bg-[#b8952e]/15 text-[#9a7b1f] dark:text-[#d4b24c]"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 dark:border-[#3a393e] dark:bg-[#1c1b1f] dark:text-zinc-300 dark:hover:border-zinc-500"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {errors.time && <p className="text-xs text-red-500 dark:text-red-400">{errors.time}</p>}
      </fieldset>

      {/* CLIENTE */}
      <div className="space-y-2">
        <label
          htmlFor="client-name"
          className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
        >
          Cliente
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#b8952e]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input
            id="client-name"
            type="text"
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            placeholder="Nome do cliente"
            className={inputClass}
          />
        </div>
        {errors.clientName && (
          <p className="text-xs text-red-500 dark:text-red-400">{errors.clientName}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-[#b8952e] px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#1c1b1f] transition hover:bg-[#c9a63a] focus:outline-none focus:ring-2 focus:ring-[#b8952e] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#232225]"
      >
        Agendar
      </button>
    </form>
  );
}