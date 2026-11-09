import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** dispara rajadas de glitch sozinho, além do hover */
  always?: boolean;
};

/**
 * Texto que se parte em duas camadas (vermelho e ciano) no hover/foco.
 * As camadas vêm de ::before/::after com `data-text`, então o leitor de
 * tela lê o conteúdo uma vez só.
 */
export function GlitchText({ text, as: Tag = "span", className = "", always = false }: Props) {
  return (
    <Tag className={`glitch ${always ? "glitch-always" : ""} ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}
