/** Chave do localStorage onde o tema escolhido fica guardado. */
export const THEME_KEY = "wired-theme";

/** Roda no <head> antes da pintura, para não piscar o tema errado. Sem React: o layout é um Server Component. */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})();`;
