import type { ReactNode } from "react";

type ScheduleSidebarProps = {
  children: ReactNode;
};

// Painel lateral: identidade visual HairDay + formulário.
export function ScheduleSidebar({ children }: ScheduleSidebarProps) {
  return (
    <aside className="w-full shrink-0 rounded-xl bg-[#232225] p-6 shadow-lg lg:w-[360px]">
      <div className="mb-6 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#b8952e] text-[#232225]">
          {/* Ícone tesoura */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#b8952e]">
          Hair Day
        </span>
      </div>
      {children}
    </aside>
  );
}