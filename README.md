# HairDay

Aplicação web para **agendamento de clientes** (salão/barbearia), desenvolvida com **React, TypeScript e Tailwind CSS**, seguindo as regras do `AGENTS.md` e a referência visual do Figma.

## Objetivo
Permitir **cadastrar, visualizar e excluir agendamentos** (nome do cliente, data e horário), com agenda filtrada por dia e organizada por períodos (Manhã, Tarde e Noite).

## Funcionalidades
- Cadastro de agendamento com **nome, data e horário**.
- Atualização imediata da agenda (sem recarregar a página).
- **Persistência em `localStorage`**: os agendamentos são salvos no navegador e mantidos ao recarregar.
- **Bloqueio de conflito**: não permite cadastrar dois clientes no mesmo **horário e data**.
- Filtro da agenda pela **data selecionada**.
- Agrupamento por períodos: **Manhã (09:00–12:00)**, **Tarde (13:00–18:00)**, **Noite (19:00–21:00)**.
- Ordenação cronológica crescente dos horários em cada período.
- Exclusão apenas do agendamento selecionado.
- Mensagem de estado vazio por período: `Você ainda não tem agendamentos cadastrados nesse período.`
- Validação de campos obrigatórios com orientação ao usuário.
- Dados mantidos no estado React/Context API (persistidos em `localStorage`), sem backend.

## Tecnologias
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)

## Instalação e execução
Pré-requisito: Node.js instalado.

```bash
# na pasta do projeto (hairday)
npm install

# ambiente de desenvolvimento
npm.cmd run dev

# build de produção
npm.cmd run build

# lint
npm.cmd run lint
```

> No Windows/PowerShell, se houver restrição de execução de scripts, use `npm.cmd` (como acima). O Vite pode exibir aviso de versão do Node em alguns ambientes; o build foi validado neste projeto.

Acesse o endereço exibido no terminal (ex.: `http://localhost:5173`).

## Estrutura do projeto
```text
src/
├─ components/
│  ├─ AppointmentForm/      # formulário, validação, seleção de horário e conflito
│  ├─ AppointmentItem/      # item da agenda e ação de excluir
│  ├─ AppointmentList/      # seletor de data, filtro e períodos
│  ├─ PeriodSection/        # cabeçalho do período, lista ou estado vazio
│  └─ ScheduleSidebar/      # identidade visual e painel lateral
├─ contexts/
│  └─ AppointmentsContext.tsx  # estado compartilhado, persistência e regras
├─ types/
│  └─ appointment.ts        # tipos Appointment, períodos e formulário
├─ utils/
│  └─ appointment.ts        # períodos/horários, filter, groupByPeriod (reduce), sort
├─ App.tsx
├─ main.tsx
└─ index.css
```

## Conceitos React/TypeScript aplicados
- **`useState`**: estado dos agendamentos (Context), campos/erros do formulário e data selecionada na agenda.
- **`useEffect`**: persistência dos agendamentos no `localStorage`.
- **Props tipadas**: dados e callbacks entre componentes (`onAdd`, `onDelete`, `appointments`).
- **`Appointment` (type)**: contrato do agendamento (`id`, `clientName`, `date` `YYYY-MM-DD`, `time` `HH:mm`).
- **`map()`**: renderização de horários e listas de agendamentos (com `key` estável = `id`).
- **`filter()`**: filtrar por data e remover um agendamento pelo `id`.
- **`reduce()`**: agrupar agendamentos por período e ordenar cronologicamente.

## Capturas de tela
- **Desktop:** [`docs/screenshot-desktop.jpg`](./docs/screenshot-desktop.jpg)
- **Mobile:** [`docs/screenshot-mobile.jpg`](./docs/screenshot-mobile.jpg)

## Evidências e checklist
Consulte [`EVIDENCIAS.md`](./EVIDENCIAS.md) para o checklist de conclusão, evidências de consulta ao **Context7**, resultados de validação no navegador e notas/limitações (incluindo **Playwright MCP**). O arquivo [`AGENTS.md`](./AGENTS.md) contém as regras do desafio.

## Referência
- [Protótipo HairDay — Figma](https://www.figma.com/design/AexPewRL0Yt7kdRbgpkKG2/Plataforma-de-agendamento--Community---Copy---c%C3%B3pia---Copy-?node-id=3-376&p=f&t=frHsFiKAETrMzX8M-0)