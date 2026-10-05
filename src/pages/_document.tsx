import { Head, Html, Main, NextScript } from "next/document";
import type { CSSProperties } from "react";
import { getThemeStyle } from "@/lib/theme";

export default function Document() {
  // Inyecta los colores del tema activo (NEXT_PUBLIC_THEME) como estilo
  // inline en el <body>: gana por especificidad y todo lo hereda.
  const themeStyle = getThemeStyle() as unknown as CSSProperties;

  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body style={themeStyle}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
