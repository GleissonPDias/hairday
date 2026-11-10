import type { Appointment } from "../../types/appointment";

type AppointmentItemProps = {
  appointment: Appointment;
  onDelete: (id: string) => void;
};

// Exibe um agendamento (horário + cliente) com ação de excluir.
export function AppointmentItem({ appointment, onDelete }: AppointmentItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-zinc-200">
          {appointment.time}
        </span>
        <span className="text-sm text-zinc-400">{appointment.clientName}</span>
      </div>
      <button
        type="button"
        aria-label={`Excluir agendamento de ${appointment.clientName}`}
        onClick={() => onDelete(appointment.id)}
        className="rounded-md p-1.5 text-[#b8952e]/70 transition hover:bg-[#b8952e]/10 hover:text-[#b8952e] focus:outline-none focus:ring-2 focus:ring-[#b8952e]"
      >
        {/* Ícone de lixeira */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </li>
  );
}