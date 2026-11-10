// Tipo principal de um agendamento.
// A data fica em ISO (YYYY-MM-DD) e o horário em 24h (HH:mm)
// para facilitar comparações e ordenação.
export type Appointment = {
  id: string;
  clientName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
};

// Períodos da agenda, na ordem em que devem aparecer.
export type PeriodKey = "morning" | "afternoon" | "evening";

export type Period = {
  key: PeriodKey;
  label: string;
  start: string;
  end: string;
};

// Dados controlados pelo formulário (antes de virar Appointment).
export type AppointmentFormData = {
  clientName: string;
  date: string;
  time: string;
};