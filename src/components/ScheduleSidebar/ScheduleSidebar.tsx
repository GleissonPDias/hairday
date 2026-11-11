import type { ReactNode } from "react";

type ScheduleSidebarProps = {
  children: ReactNode;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
};

// Painel lateral: identidade visual HairDay + formulário + alternância de tema.
export function ScheduleSidebar({
  children,
  theme = "dark",
  onToggleTheme,
}: ScheduleSidebarProps) {
  return (
    <aside className="w-full shrink-0 rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-transparent dark:bg-[#232225] lg:w-[360px]">
      <div className="mb-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
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

        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
            title={theme === "dark" ? "Tema claro" : "Tema escuro"}
            className="rounded-lg border border-zinc-300 p-2 text-zinc-600 transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#b8952e] dark:border-[#3a393e] dark:text-zinc-300 dark:hover:bg-[#1c1b1f]"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" /><path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" /><path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {children}
    </aside>
  );
}