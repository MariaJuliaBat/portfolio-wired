export const PROFILE = {
  name: "Maria Júlia Batista",
  role: "Desenvolvedora Back-end & Tech na Educação",
  line: "APIs e automações que tiram o trabalho repetitivo do caminho.",
  base: "Brasília, DF",
  school: "Computação · UnB",
  status: "Aberta a propostas",
  github: "https://github.com/MariaJuliaBat",
  linkedin: "https://www.linkedin.com/in/maria-julia-batista/",
  email: "juliabatista.tec@gmail.com",
} as const;

export type Project = {
  id: string;
  name: string;
  year: string;
  kind: string;
  /** 1–2 linhas: o que faz */
  summary: string;
  tags: string[];
  /** detalhes do modal */
  points: string[];
  href: string;
};

export const PROJECTS: Project[] = [
  {
    id: "01",
    name: "Plataforma Solidária",
    year: "2025",
    kind: "API REST",
    summary: "API para ONGs, igrejas e iniciativas comunitárias gerirem campanhas e doações em um só lugar.",
    tags: ["Node.js", "Express", "PostgreSQL", "Prisma", "Jest", "Swagger"],
    points: [
      "Feita em squad de 7 pessoas, com arquitetura em camadas.",
      "Campanhas, usuários, categorias, locais e feedbacks.",
      "Deploy no Render com PostgreSQL (Neon), docs em Swagger e MkDocs.",
    ],
    href: "https://github.com/MariaJuliaBat/Plataforma-Solidaria-API",
  },
  {
    id: "02",
    name: "Automação EGOV",
    year: "2026",
    kind: "Automação",
    summary: "Robô desktop que confere as turmas no sistema da Escola de Governo do DF e lança tudo na planilha.",
    tags: ["Python", "Playwright", "Google Sheets API", "CustomTkinter"],
    points: [
      "Substitui uma conferência manual de dezenas de turmas.",
      "Integração com Google Sheets via OAuth 2.0 e conta de serviço.",
      "Distribuído como .exe com PyInstaller.",
    ],
    href: "https://github.com/MariaJuliaBat/Automacao-EGOV",
  },
  {
    id: "03",
    name: "Preenche Vaga",
    year: "2026",
    kind: "Extensão Chrome",
    summary: "Guarda o currículo uma vez e preenche formulários de candidatura. Você revisa antes de enviar.",
    tags: ["JavaScript", "Chrome Extension", "Testes", "CI"],
    points: [
      "Importa o .docx no próprio navegador: nada sai da máquina.",
      "Nunca envia sozinha. A pessoa revisa e decide.",
      "Checagem de tipos com TypeScript, testes e CI.",
    ],
    href: "https://github.com/MariaJuliaBat/preenche-vaga",
  },
  {
    id: "04",
    name: "Booksmart",
    year: "2025",
    kind: "Full-stack",
    summary: "Catálogo de livros de matemática com busca por título, autor e ID.",
    tags: ["Node.js", "Express", "Next.js", "TypeScript"],
    points: ["API REST em Node.js + Express.", "Interface em Next.js com TypeScript.", "Projeto do módulo 5 da formação."],
    href: "https://github.com/MariaJuliaBat/booksmart_frontend",
  },
  {
    id: "05",
    name: "Notas e Médias",
    year: "2024",
    kind: "Web app",
    summary: "Calcula médias escolares, marca aprovação e exporta o histórico em PDF.",
    tags: ["Python", "Flask", "SQLite", "ReportLab"],
    points: ["Corte de aprovação em 7.", "Histórico salvo em SQLite.", "Relatório em PDF com ReportLab."],
    href: "https://github.com/MariaJuliaBat/sistema-notas",
  },
  {
    id: "06",
    name: "Bunny Bee Bounce",
    year: "2024",
    kind: "Jogo 2D",
    summary: "Plataforma vertical: um coelho sobe a torre pulando na cabeça das abelhas.",
    tags: ["Python", "Pygame Zero"],
    points: ["Menu, fases e colisão.", "Telas de vitória e derrota."],
    href: "https://github.com/MariaJuliaBat/Platformer-Game",
  },
];

/** O marco: Desafio Espacial / Ideia Space */
export const MISSION = {
  title: "Desafio Espacial",
  org: "Ideia Space",
  years: "2024 → 2025",
  summary: "Programei, em equipe, um picossatélite de verdade: código de aluno indo para o espaço, sem chance de ajuste depois do lançamento.",
  facts: [
    { k: "construção", v: "34h de desafio" },
    { k: "firmware", v: "C++ · Arduino" },
    { k: "apoio", v: "Agência Espacial Brasileira" },
    { k: "lançamento", v: "Índia · 2025" },
  ],
  awards: [
    { place: "3º", title: "Lugar geral" },
    { place: "1º", title: "Resolução de problemas" },
    { place: "1º", title: "Sustentabilidade e resp. social" },
    { place: "2º", title: "Emblemas de impacto · IBICT" },
  ],
  href: "https://www.metropoles.com/ciencia/satelite-feito-por-alunos-espaco",
};

export const STACK_CORE = ["Node.js", "Express", "PostgreSQL", "Python", "Next.js"];

export const STACK_AUX = ["JavaScript", "TypeScript", "React", "Prisma", "Jest", "Playwright", "MySQL", "C / C++", "Arduino", "Git", "Linux"];

export type LogItem = { when: string; what: string; where: string; star?: boolean };

export const LOG: LogItem[] = [
  { when: "2026", what: "Bolsista · M²ICE", where: "Meninas e Mulheres no Instituto de Ciências Exatas · UnB · Scratch, Makey Makey e Arduino com meninas da rede pública" },
  { when: "2026", what: "Estagiária de TI · concluído", where: "Escola de Governo do DF · suporte ao Moodle e Automação EGOV" },
  { when: "2026", what: "Mediadora", where: "Câmara dos Deputados · atendimento em inglês" },
  { when: "2025", what: "Picossatélite lançado", where: "Índia · com apoio da AEB", star: true },
  { when: "2025", what: "Orientadora de público", where: "SESI Lab · oficinas maker, ~3 mil visitantes" },
  { when: "2025", what: "Bolsista · Rede +Ciência nas Escolas Públicas do DF", where: "UnB · robótica e 3D em 15 escolas públicas, 720h" },
  { when: "2025", what: "Computação (Licenciatura)", where: "Universidade de Brasília · até 2029" },
  { when: "2024", what: "Desafio Espacial · 3º lugar geral", where: "Ideia Space · construção do picossatélite", star: true },
  { when: "2024", what: "Desenvolvimento Full-Stack · 720h", where: "Programadores do Amanhã" },
];

export const LANGUAGES = ["Português · nativo", "Inglês · intermediário", "Francês · intermediário", "Japonês · básico"];

export const NAV = [
  { id: "sinal", label: "sinal" },
  { id: "arquivo", label: "arquivo" },
  { id: "missao", label: "missão" },
  { id: "trajetoria", label: "trajetória" },
  { id: "contato", label: "contato" },
] as const;
