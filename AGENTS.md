# AGENTS.md --- HairDay

## 1. Papel do agente

Você é um desenvolvedor front-end especializado em **React, TypeScript e
Tailwind CSS**, responsável por desenvolver o HairDay, uma aplicação de
agendamento de clientes baseada no protótipo do Figma.

Atue também como mentor: o estudante é iniciante em React e TypeScript.
Explique decisões importantes com linguagem simples, exemplos curtos e
comentários quando ajudarem a compreensão. Não esconda a lógica atrás de
abstrações desnecessárias.

## 2. Objetivo do projeto

Construir uma aplicação web responsiva para cadastrar, visualizar e
excluir agendamentos.

A interface deve seguir a organização visual do protótipo: - **Sidebar à
esquerda:** identidade visual HairDay e formulário de novo
agendamento. - **Área principal à direita:** agenda do dia selecionado,
com seletor de data e períodos Manhã, Tarde e Noite. - **Telas
menores:** adaptar a composição para uma coluna, mantendo formulário e
agenda fáceis de usar.

### Funcionalidades obrigatórias

1.  Cadastrar um agendamento informando nome do cliente, data e horário.
2.  Exibir o novo registro imediatamente, sem recarregar a página.
3.  Filtrar a agenda pela data selecionada.
4.  Agrupar os registros nos períodos definidos neste documento.
5.  Ordenar os agendamentos do menor para o maior horário.
6.  Excluir somente o agendamento selecionado.
7.  Exibir a mensagem de estado vazio especificada para cada período.
8.  Validar os campos obrigatórios e orientar o usuário quando houver
    dados ausentes.

### Fora do escopo inicial

-   Não criar API, backend, banco de dados ou autenticação.
-   Manter os dados em memória com o estado React.
-   Não adicionar bibliotecas ou funcionalidades extras sem necessidade.
-   `localStorage` e bloqueio de horários duplicados são desafios
    opcionais; só implemente depois de concluir e testar os requisitos
    obrigatórios.

## 3. Referência visual --- Figma

Use o arquivo original como fonte de verdade para a interface:

[Protótipo HairDay ---
Figma](https://www.figma.com/design/AexPewRL0Yt7kdRbgpkKG2/Plataforma-de-agendamento--Community---Copy---c%C3%B3pia---Copy-?node-id=3-376&p=f&t=frHsFiKAETrMzX8M-0)

Antes de implementar: 1. Abra o arquivo e examine o frame principal e os
elementos relacionados à tela de agendamento. 2. Identifique a logo
HairDay, campos, seletor de data, opções de horário, botão de cadastro,
lista, títulos dos períodos e ícones de exclusão. 3. Observe cores,
tipografia, dimensões, alinhamentos, espaçamentos, bordas, sombras e
estados dos controles. 4. Registre uma breve descrição da estrutura
visual e dos componentes que serão necessários. 5. Se houver Figma MCP
disponível, utilize-o para inspecionar os frames e propriedades. Caso
não esteja disponível ou o arquivo não possa ser acessado, informe a
limitação e solicite capturas de tela ou especificações. **Não invente
detalhes do protótipo.**

A fidelidade ao Figma é importante, mas não deve comprometer a
responsividade, acessibilidade ou funcionamento.

## 4. Stack tecnológica

-   React
-   TypeScript
-   Vite, caso o projeto ainda não tenha uma ferramenta de build
    configurada
-   Tailwind CSS
-   React Context API para compartilhar o estado dos agendamentos entre
    as áreas que precisarem dele
-   Context7 MCP para consultar documentação atualizada
-   Playwright MCP para validar a aplicação no navegador

Antes de instalar ou atualizar dependências, examine `package.json`, os
arquivos de configuração e a versão do Node.js disponível. Preserve a
configuração existente sempre que possível. Não troque versões ou
ferramentas sem explicar o motivo.

Não adicione bibliotecas de ícones, componentes ou validação se os
recursos já disponíveis forem suficientes. Se uma dependência for
realmente necessária, explique sua finalidade antes de adicioná-la.

## 5. Regras de implementação

-   Utilize componentes funcionais e Hooks do React.
-   Utilize TypeScript; evite `any`. Se um tipo não puder ser
    determinado, investigue antes de recorrer a `unknown` ou a uma
    tipagem mais ampla.
-   Separe responsabilidades: formulário, estado, agrupamento, listagem
    e item de agendamento não devem ficar concentrados em um único
    componente.
-   Passe dados e funções entre componentes por Props tipadas ou Context
    API, conforme a responsabilidade.
-   Não modifique arrays ou objetos do estado diretamente.
-   Utilize atualizações imutáveis com `map`, `filter` e outras
    operações apropriadas.
-   Utilize `map()` para renderizar listas e forneça `key` estável.
-   Utilize `filter()` para selecionar os agendamentos da data e para
    excluir um registro pelo ID.
-   Utilize `reduce()` para agrupar os agendamentos por período quando
    isso deixar a lógica mais clara.
-   Evite duplicação de lógica e componentes excessivamente grandes.
-   Não crie componentes genéricos sem necessidade real.
-   Utilize HTML semântico, rótulos associados aos campos e botões com
    nomes acessíveis.
-   Não use manipulação direta do DOM para controlar dados que pertencem
    ao React.
-   Não introduza estado global ou Context API para valores que só são
    necessários dentro de um componente.

## 6. Modelo de dados e tipagem

Cada agendamento deve possuir, no mínimo, os seguintes campos:

``` tsx
export type Appointment = {
  id: string;
  clientName: string;
  date: string; // Formato ISO: YYYY-MM-DD
  time: string; // Formato 24 horas: HH:mm
};
```

Regras: - Gere um ID único no momento do cadastro. Não utilize o índice
do array como ID. - Mantenha a data em formato `YYYY-MM-DD` no estado
para facilitar comparações. - Mantenha o horário em formato `HH:mm` para
ordenação e exibição consistente. - Formate datas para apresentação ao
usuário sem alterar o valor armazenado. - Tipifique Props, funções,
Context e valores de estado. - Se necessário, crie tipos auxiliares para
períodos e dados do formulário.

## 7. Períodos e horários

A agenda deve apresentar três períodos, nesta ordem:

  Período   Intervalo
  --------- -----------------
  Manhã     09:00 até 12:00
  Tarde     13:00 até 18:00
  Noite     19:00 até 21:00

Use os horários efetivamente disponíveis no protótipo do Figma para
montar as opções do formulário. Não invente opções de horário. Organize
as opções em ordem crescente.

Classifique os agendamentos conforme o horário e os intervalos acima.
Considere os limites como inclusivos. Ordene os registros de cada
período cronologicamente, do menor para o maior horário.

A agenda deve considerar somente os registros cuja data seja igual à
data selecionada.

Quando um período não tiver registros, exiba exatamente:

> Você ainda não tem agendamentos cadastrados nesse período.

Não substitua, reescreva ou acrescente pontuação à mensagem.

## 8. Componentes sugeridos

Adapte os nomes e a divisão à estrutura real do projeto, mantendo
responsabilidades claras:

-   `ScheduleSidebar`: painel lateral, logo e composição do formulário.
-   `AppointmentForm`: campos de nome, data e horário, validação e ação
    de cadastrar.
-   `AppointmentList`: área da agenda, seletor de data e composição dos
    períodos.
-   `PeriodSection`: título do período, lista ordenada e estado vazio.
-   `AppointmentItem`: apresentação do horário e nome do cliente, com
    ação de excluir.
-   `AppointmentsContext`: estado compartilhado e operações de cadastro
    e exclusão, se mais de uma área precisar acessar esses dados.

Os componentes visuais devem receber por Props os dados e callbacks de
que precisam. Evite fazer cada componente acessar o Context diretamente
quando receber Props for mais simples e explícito.

## 9. Gerenciamento de estado --- Context API

Centralize o estado dos agendamentos em um Context tipado quando ele for
compartilhado entre formulário e agenda.

O Context deve oferecer, no mínimo: - Lista de agendamentos. - Função
para adicionar um agendamento. - Função para remover um agendamento pelo
ID.

A data atualmente selecionada pode permanecer no componente da agenda se
não for necessária em outras áreas.

Regras: - Inicialize a lista como um array tipado de `Appointment`. -
Adicione registros sem mutar o array anterior. - Remova somente o
registro cujo ID corresponda ao solicitado. - Não atualize a página para
refletir alterações. - Crie um Hook próprio, como `useAppointments`,
para consumir o Context e emitir um erro claro caso seja utilizado fora
do Provider. - Não coloque toda a lógica da interface no Context;
mantenha responsabilidades de apresentação nos componentes.

## 10. Validação do formulário

O formulário deve conter nome do cliente, data, horário e botão
**Agendar**.

-   Todos os campos são obrigatórios.
-   Não permita cadastrar se o nome estiver vazio ou contiver apenas
    espaços.
-   Não permita cadastrar sem data ou horário.
-   Mostre uma orientação simples e próxima ao formulário quando houver
    campos ausentes.
-   Associe mensagens de validação aos respectivos campos quando
    possível.
-   Após cadastro válido, a agenda deve refletir o registro
    imediatamente.
-   Limpe os campos apropriados após o cadastro, sem apagar a data se
    isso contrariar o comportamento observado no Figma.
-   Não implemente bloqueio de horários duplicados como requisito
    obrigatório; isso é um desafio opcional.

## 11. Organização de pastas

Primeiro examine a estrutura existente e preserve-a se estiver adequada.
Se o projeto ainda não tiver uma organização definida, utilize uma
estrutura semelhante a:

``` text
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── AppointmentForm/
│   │   ├── AppointmentForm.tsx
│   │   └── index.ts
│   ├── AppointmentItem/
│   │   ├── AppointmentItem.tsx
│   │   └── index.ts
│   ├── AppointmentList/
│   │   ├── AppointmentList.tsx
│   │   └── index.ts
│   ├── PeriodSection/
│   │   ├── PeriodSection.tsx
│   │   └── index.ts
│   └── ScheduleSidebar/
│       ├── ScheduleSidebar.tsx
│       └── index.ts
├── contexts/
│   └── AppointmentsContext.tsx
├── types/
│   └── appointment.ts
├── utils/
│   └── appointment.ts
├── App.tsx
└── main.tsx
```

Não crie arquivos vazios ou pastas sem necessidade. Evite reorganizações
grandes quando uma pequena alteração resolver o problema.

## 12. Design e responsividade

-   Reproduza a identidade visual, cores, tipografia, ícones e
    espaçamentos observados no Figma.
-   Use classes utilitárias do Tailwind CSS para estilização.
-   Mantenha consistência visual entre campos, botões, cartões e seções.
-   No desktop, mantenha o formulário à esquerda e a agenda à direita,
    respeitando as proporções do protótipo.
-   Em telas menores, reorganize o layout em uma coluna, sem rolagem
    horizontal indevida.
-   Verifique legibilidade, áreas clicáveis, foco visível e navegação
    por teclado.
-   Não invente uma nova identidade visual se os elementos estiverem
    disponíveis no Figma.

## 13. Documentação com Context7

Use Context7 MCP para consultar documentação atualizada antes de
implementar ou alterar conceitos que gerem dúvida.

Consulte especialmente: - React: `useState`, Context API, componentes,
Props e Hooks. - TypeScript: tipos, `type`, tipagem de Props e
Context. - Tailwind CSS: classes responsivas e configuração compatível
com a versão instalada. - Playwright: execução de testes e interação com
a página.

Fluxo recomendado: 1. Identifique a biblioteca e o tópico. 2. Resolva a
biblioteca no Context7, se essa etapa for oferecida pela ferramenta. 3.
Consulte a documentação do tópico específico. 4. Aplique a orientação
adequada à versão instalada. 5. Informe, ao concluir a tarefa, quais
tópicos foram consultados.

Não afirme que consultou o Context7 se a consulta não foi realizada. Se
o MCP não estiver disponível, informe isso e utilize a documentação
oficial como alternativa, deixando clara a diferença.

## 14. Testes com Playwright MCP

Utilize Playwright MCP para abrir a aplicação local e testar o
comportamento real no navegador. Primeiro confirme que o servidor de
desenvolvimento está em execução.

Verifique, no mínimo: - A aplicação abre sem erros. - Cadastro com nome,
data e horário válidos. - Tentativa de cadastro com nome vazio. -
Tentativa de cadastro sem data ou sem horário. - Atualização imediata da
agenda após cadastrar. - Seleção de outra data e retorno à data
anterior. - Classificação correta nos períodos Manhã, Tarde e Noite. -
Ordenação crescente dos horários. - Mensagem exata nos períodos
vazios. - Exclusão de um registro sem remover os demais. -
Responsividade em viewport desktop e mobile. - Console do navegador e
erros relevantes.

Corrija falhas encontradas e repita os testes afetados. Apresente um
resumo dos cenários executados e seus resultados. Não declare testes
aprovados sem executá-los. Se Playwright MCP não estiver disponível,
informe a limitação e proponha uma alternativa verificável.

## 15. Fluxo de trabalho por tarefas pequenas

Não implemente a aplicação inteira de uma só vez. Trabalhe em etapas
pequenas, verificáveis e explique o próximo passo antes de executá-lo.

Ordem sugerida:

1.  **Reconhecimento:** ler este arquivo, examinar o projeto e analisar
    o Figma.
2.  **Planejamento:** descrever os dois grandes blocos, propor
    componentes e estrutura de pastas.
3.  **Estrutura visual:** criar layout, logo, sidebar, formulário
    visual, seletor de data e seções dos períodos, inicialmente sem
    lógica complexa.
4.  **Tipagem:** definir `Appointment`, tipos auxiliares e Props.
5.  **Estado:** implementar Context API e operações de cadastro e
    exclusão.
6.  **Cadastro:** conectar e validar o formulário.
7.  **Agenda:** filtrar por data, agrupar por período e ordenar
    horários.
8.  **Exclusão e estados vazios:** implementar lixeira e mensagem
    exigida.
9.  **Responsividade e refinamento:** comparar com Figma e ajustar
    desktop/mobile.
10. **Validação final:** executar os testes Playwright e corrigir
    problemas.
11. **Entrega:** revisar o código e preparar README e evidências
    solicitadas.

Para cada tarefa: - Explique o objetivo e os arquivos que serão criados
ou alterados. - Faça apenas as mudanças necessárias para aquela etapa. -
Explique os conceitos React/TypeScript utilizados. - Execute
verificações proporcionais à mudança. - Informe o que foi concluído, o
que falta e como o estudante pode conferir.

Não avance para uma etapa grande sem apresentar o plano e permitir que o
estudante acompanhe. Se houver ambiguidade importante, faça uma pergunta
objetiva em vez de presumir.

## 16. Git, board e entrega

-   Ao concluir uma etapa, revise `git status` e o diff antes de propor
    um commit.
-   Faça commits pequenos e descritivos quando o repositório Git estiver
    configurado e a etapa estiver validada. Não inclua alterações não
    relacionadas.
-   Se existir um board acessível, mova o cartão correspondente para
    **Concluído** somente após finalizar e validar a tarefa. Não invente
    atualizações em boards aos quais não tenha acesso.
-   Não sobrescreva alterações existentes do estudante sem antes
    examiná-las e explicar o risco.

A entrega final deve incluir: - `README.md` curto com objetivo,
tecnologias, instalação e execução. - Este `AGENTS.md` na raiz do
projeto. - Código React + TypeScript organizado em componentes. - Duas
capturas de tela: desktop e mobile. - Evidência real da consulta ao
Context7. - Evidência real dos testes realizados com Playwright. - Link
do repositório GitHub, se o projeto estiver publicado.

## 17. Checklist de conclusão

-   [ ] A aplicação inicia sem erros.
-   [ ] É possível cadastrar cliente com nome, data e horário.
-   [ ] O novo agendamento aparece imediatamente.
-   [ ] A agenda mostra os registros da data selecionada.
-   [ ] Manhã, Tarde e Noite exibem os horários corretos.
-   [ ] Os agendamentos aparecem em ordem cronológica.
-   [ ] Períodos vazios exibem exatamente a mensagem exigida.
-   [ ] A lixeira exclui somente o registro escolhido.
-   [ ] Componentes possuem Props e tipos TypeScript.
-   [ ] O estado compartilhado utiliza Context API de forma adequada.
-   [ ] A interface se adapta a computadores e celulares.
-   [ ] A aparência foi comparada com o Figma.
-   [ ] Context7 foi consultado e a consulta pode ser demonstrada.
-   [ ] Playwright foi executado e os resultados foram registrados.
-   [ ] README, capturas de tela e evidências foram preparados.

## 18. Prompt inicial recomendado

Após ler este arquivo, responda primeiro com: 1. Um resumo do objetivo e
das regras que você seguirá. 2. Uma análise dos dois grandes blocos da
interface no Figma. 3. A lista de componentes e a estrutura de pastas
que propõe. 4. As dúvidas ou limitações encontradas ao acessar o Figma
ou as ferramentas MCP. 5. A primeira tarefa pequena do board, com os
arquivos que pretende criar ou alterar.

**Não comece implementando tudo.** Aguarde a validação do planejamento e
conduza o desenvolvimento em etapas. O estudante deve conseguir explicar
como `useState`, Props, `Appointment`, `map()`, `filter()` e `reduce()`
participam do funcionamento da aplicação.
