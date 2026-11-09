export type ScreenId = "signal" | "wired" | "bounties" | "modules" | "logbook" | "archive" | "uplink";

export type Bounty = {
  id: string;
  codename: string;
  status: "EM CAMPO" | "CAPTURADO" | "ARQUIVADO";
  target: string;
  method: string;
  tags: string[];
  href: string;
  hrefLabel: string;
  /** posição do blip no radar, em % */
  blip: { x: number; y: number };
};

export const PROFILE = {
  name: "Maria Júlia",
  handle: "MariaJuliaBat",
  role: "Engenheira de Sistemas / Navegadora da Wired",
  base: "Brasília-DF",
  link: "UnB · Computação (Licenciatura)",
  status: "Aberta a propostas",
  manifesto:
    "Construo APIs e automações para tirar trabalho repetitivo de cima de quem tem coisa melhor a fazer. Quando o sistema é lento, eu abro, olho por dentro e conserto.",
  mission:
    "Como futura licenciada em Computação, quero contribuir para a educação e inspirar a próxima geração na tecnologia.",
  github: "https://github.com/MariaJuliaBat",
  linkedin: "https://www.linkedin.com/in/maria-julia-batista/",
  email: "juliabatista.tec@gmail.com",
} as const;

export const BOUNTIES: Bounty[] = [
  {
    id: "001",
    codename: "AUTOMAÇÃO EGOV",
    status: "EM CAMPO",
    target:
      "Conferir à mão dezenas de turmas e copiar os dados para a planilha de controle da Escola de Governo do DF.",
    method:
      "App desktop (.exe) em Python. O Playwright navega pelo sistema, o CustomTkinter dá a interface e o Google Sheets recebe os dados por OAuth 2.0, com uma conta de serviço dedicada.",
    tags: ["Python", "Playwright", "Google Sheets API", "CustomTkinter", "PyInstaller"],
    href: "https://github.com/MariaJuliaBat/Automacao-EGOV",
    hrefLabel: "github.com/MariaJuliaBat/Automacao-EGOV",
    blip: { x: 68, y: 27 },
  },
  {
    id: "002",
    codename: "PLATAFORMA SOLIDÁRIA",
    status: "CAPTURADO",
    target:
      "Igrejas, ONGs e iniciativas comunitárias controlam doações sem nenhuma ferramenta integrada.",
    method:
      "API REST em camadas, feita em squad de 7 pessoas: campanhas, usuários, categorias, locais e feedbacks. Testes com Jest, docs em Swagger e MkDocs, deploy no Render com PostgreSQL (Neon) via Prisma.",
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL", "Jest", "Swagger"],
    href: "https://github.com/MariaJuliaBat/Plataforma-Solidaria-API",
    hrefLabel: "github.com/MariaJuliaBat/Plataforma-Solidaria-API",
    blip: { x: 30, y: 36 },
  },
  {
    id: "003",
    codename: "PREENCHE VAGA",
    status: "EM CAMPO",
    target:
      "Quem procura emprego digita nome, contato e experiência dezenas de vezes, em sites diferentes.",
    method:
      "Extensão de Chrome que guarda o currículo uma vez (importa o .docx no próprio navegador) e preenche o formulário da vaga. Nunca envia: a pessoa revisa e decide. Tem testes e CI.",
    tags: ["JavaScript", "Chrome Extension", "TypeScript (checagem)", "Testes"],
    href: "https://github.com/MariaJuliaBat/preenche-vaga",
    hrefLabel: "github.com/MariaJuliaBat/preenche-vaga",
    blip: { x: 74, y: 62 },
  },
  {
    id: "004",
    codename: "IDEIA SPACE",
    status: "CAPTURADO",
    target:
      "Pôr código de aluno dentro de um satélite de verdade, com data de lançamento e sem chance de ajuste depois.",
    method:
      "Programação de um picossatélite em C++ e Arduino, com apoio da Agência Espacial Brasileira e lançamento na Índia. A equipe ficou em 3º lugar geral no Desafio Espacial.",
    tags: ["C++", "Arduino", "Hardware"],
    href: "https://www.metropoles.com/ciencia/satelite-feito-por-alunos-espaco",
    hrefLabel: "metropoles.com/ciencia/satelite-feito-por-alunos-espaco",
    blip: { x: 22, y: 63 },
  },
  {
    id: "005",
    codename: "BOOKSMART",
    status: "ARQUIVADO",
    target: "Um catálogo de livros de matemática com busca por título, autor e ID.",
    method:
      "API REST em Node.js e Express no back-end e interface em Next.js com TypeScript, feitas no módulo 5 da formação.",
    tags: ["Next.js", "TypeScript", "Node.js", "Express"],
    href: "https://github.com/MariaJuliaBat/booksmart_frontend",
    hrefLabel: "github.com/MariaJuliaBat/booksmart_frontend",
    blip: { x: 56, y: 16 },
  },
  {
    id: "006",
    codename: "BUNNY BEE BOUNCE",
    status: "ARQUIVADO",
    target: "Um jogo curto: um coelho, uma torre e abelhas que precisam levar pulo na cabeça.",
    method: "Plataforma 2D vertical em Python com Pygame Zero: menu, fases, colisão e telas de vitória e derrota.",
    tags: ["Python", "Pygame Zero", "Game dev"],
    href: "https://github.com/MariaJuliaBat/Platformer-Game",
    hrefLabel: "github.com/MariaJuliaBat/Platformer-Game",
    blip: { x: 84, y: 44 },
  },
  {
    id: "007",
    codename: "NOTAS E MÉDIAS",
    status: "ARQUIVADO",
    target: "Calcular a média de notas escolares, dizer quem passou e guardar o histórico.",
    method:
      "Aplicação Flask que calcula a média, marca aprovado ou reprovado (corte em 7), grava no SQLite e exporta o relatório em PDF.",
    tags: ["Python", "Flask", "SQLite", "ReportLab"],
    href: "https://github.com/MariaJuliaBat/sistema-notas",
    hrefLabel: "github.com/MariaJuliaBat/sistema-notas",
    blip: { x: 36, y: 14 },
  },
];

export type Mod = {
  name: string;
  role: string;
  /** ids de bounties em que o módulo realmente aparece */
  loadedIn: string[];
};

export const CORE_MODULES: Mod[] = [
  {
    name: "Node.js",
    role: "Runtime das APIs. É onde passo a maior parte do tempo.",
    loadedIn: ["002", "005"],
  },
  {
    name: "Express",
    role: "Rotas, middlewares e camadas de controller e model nas APIs REST.",
    loadedIn: ["002", "005"],
  },
  {
    name: "PostgreSQL",
    role: "Banco relacional em produção, acessado por Prisma, com migrations versionadas.",
    loadedIn: ["002"],
  },
  {
    name: "Python",
    role: "Automações, um jogo e uma aplicação web: Playwright, Pygame Zero e Flask.",
    loadedIn: ["001", "006", "007"],
  },
  {
    name: "Next.js",
    role: "Interfaces em React com App Router, como este portfólio.",
    loadedIn: ["005"],
  },
];

export const AUX_MODULES = [
  "JavaScript",
  "TypeScript",
  "React",
  "Playwright",
  "Prisma",
  "Jest",
  "MySQL",
  "C / C++",
  "Arduino",
  "Git · GitHub",
  "Linux",
];

export type LogEntry = {
  stamp: string;
  title: string;
  detail: string;
};

export const LOGBOOK: LogEntry[] = [
  {
    stamp: "2026.10",
    title: "Bolsista do projeto M²ICE · UnB",
    detail:
      "Acompanho os encontros que levam Scratch, Makey Makey e Arduino a meninas de escolas públicas do DF, nos polos Samambaia, Plano Piloto e Santa Maria. Registro tudo em foto e vídeo e produzo os carrosséis, os Reels e os relatórios.",
  },
  {
    stamp: "2026.08",
    title: "Estagiária de TI · Escola de Governo do DF",
    detail:
      "Suporte à plataforma de cursos EAD (Moodle) na Secretaria de Economia. É aqui que nasce a Automação EGOV, e a conferência manual de turmas deixa de existir.",
  },
  {
    stamp: "2026.08",
    title: "Qualifica DF · Manutenção de aparelhos celulares",
    detail: "240 horas de curso, de agosto a outubro, pela SEDET-DF.",
  },
  {
    stamp: "2026.05",
    title: "Mediadora · Câmara dos Deputados",
    detail:
      "Recepção de visitantes, com conversação em inglês para orientar turistas estrangeiros.",
  },
  {
    stamp: "2025.11",
    title: "Orientadora de público · SESI Lab",
    detail:
      "Mediação em oficinas Maker de tecnologia, ciência e matemática. Cerca de 3 mil visitantes, com dias de até mil pessoas passando por uma única galeria.",
  },
  {
    stamp: "2025.10",
    title: "Bolsista de extensão · Rede +Ciência nas Escolas Públicas do DF",
    detail:
      "720 horas, de outubro de 2025 a outubro de 2026. Oficinas de robótica, audiovisual e modelagem 2D/3D em 15 escolas públicas, formação de professores com o jogo Hackatown Maker e produção de foto e vídeo do projeto.",
  },
  {
    stamp: "2025.03",
    title: "Computação (Licenciatura) · Universidade de Brasília",
    detail: "Previsão de conclusão em 2029.",
  },
  {
    stamp: "2025",
    title: "O picossatélite sobe",
    detail:
      "O satélite programado em C++ e Arduino foi lançado na Índia, com apoio da Agência Espacial Brasileira.",
  },
  {
    stamp: "2024.08",
    title: "Desafio Espacial · Ideia Space",
    detail:
      "34 horas construindo um picossatélite. A equipe levou 3º lugar geral, 1º em Resolução de Problemas, 1º em Sustentabilidade e Responsabilidade Social e 2º em Emblemas de Impacto (IBICT).",
  },
  {
    stamp: "2024.07",
    title: "Programadores do Amanhã · Full-Stack",
    detail:
      "720 horas até julho de 2025: JavaScript, Node.js, Express, Sequelize, MySQL e React, com projetos em squad e inglês técnico.",
  },
];

export type Credential = { title: string; org: string; hours?: string; year: string };

export const EDUCATION: { stamp: string; title: string; where: string; note: string }[] = [
  {
    stamp: "2025 → 2029",
    title: "Computação (Licenciatura)",
    where: "Universidade de Brasília (UnB)",
    note: "Previsão de conclusão em 2029.",
  },
  {
    stamp: "2024 → 2025",
    title: "Desenvolvimento Web Full-Stack · 720h",
    where: "Programadores do Amanhã",
    note: "JavaScript, Node.js, Express, Sequelize, MySQL e React. APIs REST, aplicações responsivas, trabalho em squad, inglês e soft skills.",
  },
  {
    stamp: "2024",
    title: "Ensino Médio",
    where: "Centro de Ensino Médio 01 de Sobradinho",
    note: "Concluído em 2024.",
  },
  {
    stamp: "idiomas",
    title: "Francês e Japonês",
    where: "Centro Interescolar de Línguas (CIL)",
    note: "Cursos de língua e literatura.",
  },
];

export const CREDENTIALS: Credential[] = [
  { title: "Manutenção de Aparelhos Celulares", org: "QualificaDF · SEDET-DF", hours: "240h", year: "2026" },
  {
    title: "Extensão: Jogo do Hackatown Maker na Rede +Ciência",
    org: "Universidade de Brasília",
    hours: "720h",
    year: "2026",
  },
  { title: "Big Data e Inteligência Artificial", org: "BRASIL.IA · Governo do DF", hours: "60h", year: "2025" },
  { title: "PdA M4 · APIs com Node.js e Storytelling", org: "Programadores do Amanhã", hours: "90h", year: "2025" },
  { title: "PdA M3 · Back-end com SQL e Visão de Negócio", org: "Programadores do Amanhã", hours: "90h", year: "2025" },
  { title: "PdA M2 · Front-end e Gestão Ágil", org: "Programadores do Amanhã", hours: "90h", year: "2025" },
  { title: "PdA M1 · Programação, Soft Skills e Inglês", org: "Programadores do Amanhã", hours: "90h", year: "2024" },
  { title: "Desafio Espacial: Construção de um Picossatélite", org: "Ideia Space", hours: "34h", year: "2024" },
];

export const AWARDS: { place: string; title: string }[] = [
  { place: "3º", title: "Lugar geral" },
  { place: "1º", title: "Resolução de problemas" },
  { place: "1º", title: "Sustentabilidade e responsabilidade social" },
  { place: "2º", title: "Emblemas de impacto" },
];

export const LANGUAGES: { name: string; level: string }[] = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Intermediário · conversação" },
  { name: "Francês", level: "Intermediário" },
  { name: "Japonês", level: "Básico" },
];

export const SOFT_SKILLS =
  "Comunicação (inclusive em inglês), trabalho em equipe, didática, liderança, criatividade e autonomia.";

export const SCREENS: { id: ScreenId; key: string; label: string; hint: string }[] = [
  { id: "signal", key: "1", label: "SIGNAL", hint: "quem opera" },
  { id: "bounties", key: "2", label: "BOUNTIES", hint: "projetos" },
  { id: "modules", key: "3", label: "MODULES", hint: "stack" },
  { id: "logbook", key: "4", label: "LOGBOOK", hint: "trajetória" },
  { id: "archive", key: "5", label: "ARCHIVE", hint: "formação" },
  { id: "uplink", key: "6", label: "UPLINK", hint: "contato" },
  { id: "wired", key: "7", label: "WIRED", hint: "o que é isso" },
];
