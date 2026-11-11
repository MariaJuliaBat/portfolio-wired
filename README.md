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

