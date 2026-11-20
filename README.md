# Maria Júlia Batista — portfólio

Portfólio de uma desenvolvedora full-stack que trabalha com tecnologia na educação.
Escuro e com atmosfera de terminal noir: chumbo noturno, ouro velho e o brilho pálido de
uma tela de fósforo, com grade técnica e granulação sutis ao fundo. Referências discretas a
*Serial Experiments Lain* e *Cowboy Bebop*, sem imagens dos animes. O site é silencioso:
não tem áudio nem foto.

Feito com Next.js 16 (App Router), React 19 e Tailwind CSS 4.

## Seções

| Seção | O que mostra |
|---|---|
| **Sinal** | nome, título, uma frase e um diagrama orbital em SVG animado |
| **Arquivo** | projetos em "janelas": nome, descrição curta, tecnologias e link `código ↗`; o detalhe abre num modal |
| **Missão** | o Desafio Espacial (Ideia Space): 3º lugar geral, o picossatélite lançado na Índia e os prêmios |
| **Trajetória** | stack principal e idiomas à esquerda; à direita, abas com Experiência, Formação e Marcos Espaciais |
| **Contato** | e-mail, GitHub e LinkedIn |

## Detalhes de interação

- **Barra no topo** com atalhos para cada seção; a seção visível fica sublinhada.
- **Menu discreto embaixo** (`>`), só em telas a partir de 768px: abre ao passar o mouse, ao clicar ou com a tecla `/`.
- **Cartões** têm cantoneiras técnicas e, no hover, uma linha de destaque no topo e a borda em menta.
- **Abas da Trajetória** funcionam com clique ou com as setas ← → do teclado.
- **Rastro do mouse**: um fio finíssimo e curtíssimo que some em instantes (`components/OrbitTrail.tsx`).
- Quem usa `prefers-reduced-motion` recebe a página sem animações; telas de toque não
  recebem rastro.
- Responsivo: abaixo de 768px o layout vira uma coluna, sem rolagem horizontal.
