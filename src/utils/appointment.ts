import type { Appointment, Period, PeriodKey } from "../types/appointment";

// Períodos da agenda, na ordem exigida.
export const PERIODS: Period[] = [
  { key: "morning", label: "Manhã", start: "09:00", end: "12:00" },
  { key: "afternoon", label: "Tarde", start: "13:00", end: "18:00" },
  { key: "evening", label: "Noite", start: "19:00", end: "21:00" },
];

// Faixa exibida no cabeçalho de cada período (como no protótipo).
export const PERIOD_RANGES: Record<PeriodKey, string> = {
  morning: "09h-12h",
  afternoon: "13h-18h",
  evening: "19h-21h",
};

// Horários disponíveis para cadastro (slots de 1 hora).
// Limites inclusivos conforme os períodos acima.
export const AVAILABLE_TIMES: string[] = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

// Mensagem exata para períodos vazios.
export const EMPTY_PERIOD_MESSAGE =
  "Você ainda não tem agendamentos cadastrados nesse período.";

// Converte "HH:mm" em minutos para comparações.
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Verifica se um horário está dentro de um período (limites inclusivos).
export function isTimeInPeriod(time: string, period: Period): boolean {
  const value = timeToMinutes(time);
  return (
    value >= timeToMinutes(period.start) && value <= timeToMinutes(period.end)
  );
}

// Descobre a qual período um horário pertence.
export function getPeriodKey(time: string): PeriodKey | null {
  for (const period of PERIODS) {
    if (isTimeInPeriod(time, period)) {
      return period.key;
    }
  }
  return null;
}

// Formata data ISO (YYYY-MM-DD) para apresentação (dd/mm/yyyy).
export function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

// Filtra agendamentos pela data selecionada.
export function filterByDate(
  appointments: Appointment[],
  date: string
): Appointment[] {
  return appointments.filter((appointment) => appointment.date === date);
}

// Agrupa agendamentos por período usando reduce().
// Cada período recebe uma lista ordenada cronologicamente.
export function groupByPeriod(
  appointments: Appointment[]
): Record<PeriodKey, Appointment[]> {
  const grouped: Record<PeriodKey, Appointment[]> = {
    morning: [],
    afternoon: [],
    evening: [],
  };

  return appointments.reduce((acc, appointment) => {
    const key = getPeriodKey(appointment.time);
    if (key) {
      acc[key].push(appointment);
      // Ordena o período do menor para o maior horário.
      acc[key].sort(
        (a, b) => timeToMinutes(a.time) - timeToMinutes(b.time)
      );
    }
    return acc;
  }, grouped);
}

// Gera um ID único simples para o cadastro.
export function generateId(): string {
  return crypto.randomUUID();
}