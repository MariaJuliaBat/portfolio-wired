# WIRED/OS — portfólio de Maria Júlia

Portfólio em forma de terminal de dados, delicado e retrô: tubo CRT, céu estrelado, radar, um
picossatélite em órbita, a nave MJB-01, fios de poste, um micro dos anos 80, uma personagem
em pixel art (a Maju) e som sintetizado. Inspirado em *Serial Experiments Lain* e
*Cowboy Bebop*. Next.js 16 (App Router), React 19, Tailwind CSS 4 e Framer Motion.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

## Checar antes de publicar

```bash
npm run lint
npm run typecheck
npm run build
```

Os três passam sem erros nem avisos.

## Publicar na Vercel

**Jeito mais fácil (pelo GitHub):**

1. Crie um repositório e suba a pasta (dentro de `portfolio-wired`):
   ```bash
   git init
   git add .
   git commit -m "portfólio WIRED/OS"
   gh repo create portfolio-wired --public --source=. --push
   ```
   (sem o `gh`, crie o repositório vazio em github.com/new e use `git remote add origin ...` + `git push -u origin main`).
2. Entre em **vercel.com** com a conta do GitHub (Continue with GitHub).
3. **Add New → Project**, escolha `portfolio-wired` e clique em **Import**.
4. Deixe tudo no padrão: Framework **Next.js**, Build `next build`, sem variáveis de ambiente.
5. Clique em **Deploy**. Em cerca de 1 minuto sai um link `portfolio-wired.vercel.app`.

Cada `git push` depois disso publica de novo sozinho. Para usar um domínio próprio:
**Project → Settings → Domains**.

**Sem GitHub:** `npm i -g vercel`, depois `vercel` dentro da pasta e responda às perguntas.

## Como navegar

| Ação | Como |
|---|---|
| Trocar de faixa | clique no menu, teclas `1` a `7`, ou os botões "faixa anterior / próxima" no rodapé de cada tela |
| Entender o que é a Wired | faixa `7` (a última) |
| Som | tela inicial "ligar com/sem som" ou botão SOM na barra de status |
| Tema | botão TEMA na barra de status (escuro ↔ claro; a escolha fica salva) |
| Abrir um projeto | clique num ponto do radar, ou `open 003` / `open egov` no terminal |
| Falar com a Maju | clique nela (tela inicial) |
| Terminal | tecla `/` |
| Rever o boot | comando `reboot` |

### Todos os comandos do terminal

Aperte `/` para abrir o terminal (ou clique na linha de baixo) e digite:

| Comando | O que faz |
|---|---|
| `help` | lista os comandos principais |
| `ls` | lista as faixas |
| `signal` | abre a faixa 1, SIGNAL (quem eu sou) |
| `bounties` | abre a faixa 2, BOUNTIES (projetos) |
| `modules` | abre a faixa 3, MODULES (stack) |
| `logbook` | abre a faixa 4, LOGBOOK (trajetória) |
| `archive` | abre a faixa 5, ARCHIVE (formação, certificados, prêmios, idiomas) |
| `uplink` | abre a faixa 6, UPLINK (contato) |
| `wired` | abre a faixa 7, WIRED (o que é a Wired e glossário) |
| `open <id>` | abre um projeto pelo número: `open 001` até `open 007` (ou só `open 3`) |
| `open <nome>` | abre um projeto pelo nome: `open egov`, `open solid`, `open preenche`, `open ideia`, `open book`, `open bunny`, `open notas` |
| `whoami` | mostra quem está na Wired |
| `reboot` | desliga e roda a sequência de boot de novo |

**Comandos escondidos** (não aparecem no `help`):

| Comando | O que faz |
|---|---|
| `ein` | o cachorro mais inteligente do sistema manda um oi |
| `bang` | a despedida de um caçador de recompensas |
| `jam` | contagem regressiva de Cowboy Bebop, com um sininho |
| `lain` | "present day, present time" |
| `sudo` | permissão negada (a Wired não responde a sudo) |

Comando desconhecido devolve um aviso e um som baixinho de erro.

Quem usa `prefers-reduced-motion` recebe a interface sem ruído animado, glitch, estrelas em movimento nem transição de sinal.

## Som

Nenhum arquivo de áudio: tudo é gerado na hora com Web Audio (`lib/audio.ts`), só com ondas
senoidais e triangulares em volume baixo (som de caixinha de música e teclado macio). Começa
desligado, porque navegadores exigem um clique antes de tocar; a preferência fica salva.

## Temas

Duas paletas por variáveis CSS em `app/globals.css`: **escuro** (ameixa-noite com menta,
pêssego e rosa) e **claro** (papel rosado com tinta índigo). O tema é aplicado por um script
no `<head>` antes da pintura, então a página não pisca. O padrão é escuro.

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Projetos (bounties), stack, trajetória, formação, certificados, contatos | `lib/data.ts` |
| Sons | `lib/audio.ts` |
| Cores dos dois temas | `app/globals.css` (variáveis `--c-*`) |
| Linhas do boot | `components/BootSequence.tsx` |
| Texto da tela WIRED | `components/screens/WiredScreen.tsx` |
| A Maju em pixel art (cores e desenho) | `components/PixelMaju.tsx` (as falas ficam em `components/Character.tsx`) |
| A nave e a cena de órbita | `components/Spaceship.tsx`, `components/SpaceScene.tsx` |
| Comandos do terminal | `components/WiredOS.tsx` |

## Estrutura

```text
app/            layout, página, 404 e favicon
components/
  BootSequence  boot digitado antes de revelar o site
  TerminalWindow  janela arredondada com brilho suave
  GlitchText    texto que se parte em duas cores
  CRTOverlay    scanlines, vinheta, ruído e flicker
  SignalLoss    transição entre telas
  Scope         radar com os projetos como pontos
  StarField     céu de estrelas em canvas (acompanha o tema)
  PowerLines    fios de poste balançando no topo
  FlyBy         a nave MJB-01 cruzando a tela em 3D
  Spaceship     a nave esguia, ouro rosé e ameixa, com gradientes
  SpaceScene    planeta com anel, lua, picossatélite e nave
  RetroComputer micro dos anos 80 (link de e-mail)
  Character     a Maju: pisca, flutua e fala ao clique
  PixelMaju     o sprite em pixel art (grade 32×36)
  PageFooter    rodapé de toda tela: faixa rolando, faixa anterior/próxima e despedida
  Logo          marca do WIRED/OS (também em app/icon.svg)
  screens/      as sete telas
lib/            data.ts (conteúdo), audio.ts (sons), theme.ts (tema)
```
