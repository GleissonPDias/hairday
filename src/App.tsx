import { useAppointments } from "./contexts/AppointmentsContext";
import { ScheduleSidebar } from "./components/ScheduleSidebar";
import { AppointmentForm } from "./components/AppointmentForm";
import { AppointmentList } from "./components/AppointmentList";

function AppContent() {
  const { appointments, addAppointment, removeAppointment } = useAppointments();

  return (
    <div className="min-h-screen bg-[#141316] px-4 py-6 text-zinc-200 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-start">
        <ScheduleSidebar>
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