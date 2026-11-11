# Maria Júlia Batista — portfólio

Portfólio de uma desenvolvedora back-end que trabalha com tecnologia na educação.
Minimalista, escuro e com atmosfera de terminal noir: preto fumado, ouro velho e o
brilho pálido de uma tela de fósforo. Referências sutis a *Serial Experiments Lain* e
*Cowboy Bebop*, sem imagens dos animes.

Feito com Next.js 16 (App Router), React 19 e Tailwind CSS 4.

## Seções

| Seção | O que mostra |
|---|---|
| **Sinal** | nome, título, uma frase e o cartão de identificação com a foto |
| **Arquivo** | projetos em "janelas": nome, descrição curta e tecnologias; o detalhe abre num modal |
| **Missão** | o Desafio Espacial (Ideia Space): 3º lugar geral e o picossatélite lançado na Índia |
| **Trajetória** | stack, idiomas e linha do tempo |
| **Contato** | e-mail, GitHub e LinkedIn |

## Detalhes de interação

- **Barra no topo** com atalhos para cada seção; a seção atual fica acesa.
- **Menu discreto embaixo** (`>`): abre ao passar o mouse, ao clicar ou com a tecla `/`.
- **Cartões de projeto** acendem a borda em menta no hover e revelam mais um detalhe.
- **Rastro do mouse**: um fio finíssimo e curtíssimo que some em instantes (`components/OrbitTrail.tsx`).
- **Sininho** ao passar o mouse sobre cartões e links (`lib/click.ts`). Não há arquivo de áudio:
  o som é gerado na hora com Web Audio, em volume baixo (12%). Só toca depois do primeiro
  clique ou tecla do visitante, porque os navegadores exigem isso, e falha em silêncio se
  o áudio estiver bloqueado.
- Quem usa `prefers-reduced-motion` recebe a página sem animações; telas de toque não
  recebem rastro nem som.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

Antes de publicar:

```bash
npm run lint
npm run typecheck
npm run build
```

## Publicar na Vercel

1. Entre em **vercel.com** com a conta do GitHub.
2. **Add New → Project**, escolha este repositório e clique em **Import**.
3. Deixe tudo no padrão (Framework **Next.js**, sem variáveis de ambiente) e clique em **Deploy**.

Cada `git push` na `main` publica uma nova versão. Para usar um domínio próprio:
**Project → Settings → Domains**.

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Nome, título, frase, contatos | `lib/data.ts` (`PROFILE`) |
| Projetos | `lib/data.ts` (`PROJECTS`) |
| Desafio Espacial | `lib/data.ts` (`MISSION`) |
| Stack, idiomas e linha do tempo | `lib/data.ts` (`STACK_CORE`, `STACK_AUX`, `LANGUAGES`, `LOG`) |
| Links da barra de navegação | `lib/data.ts` (`NAV`) |
| Cores (preto fumado, bronze, menta) e vidro dos painéis | `app/globals.css` (variáveis `--c-*`) |
| Fontes | `app/layout.tsx` |
| Foto | `public/maju.jpg` (retrato 4:5, 800×1000) |
| Som do hover (notas, volume) | `lib/click.ts` |
| Rastro do mouse (comprimento, duração) | `components/OrbitTrail.tsx` |

## Estrutura

```text
app/                  layout, página, 404 e favicon (monograma MJ)
components/
  TopNav              barra fixa no topo com os atalhos
  Prompt              menu discreto no canto inferior
  Signal              primeira tela e cartão de identificação
  Projects            grade de projetos e modal de detalhes
  Mission             Desafio Espacial / picossatélite
  Journey             stack, idiomas, linha do tempo e contato
  SectionLabel        rótulo numerado de cada seção
  OrbitTrail          rastro do mouse em canvas
  HoverSound          dispara o sininho no hover
lib/
  data.ts             todo o conteúdo do site
  click.ts            sininho sintetizado (Web Audio)
  useActiveSection.ts descobre a seção atual na rolagem
public/               foto
```

## Fontes

[Inter Tight](https://fonts.google.com/specimen/Inter+Tight) para os textos,
[IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) para os detalhes técnicos e
[Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) no monograma e nos
números de destaque, todas carregadas com `next/font` (hospedadas junto com o site).
