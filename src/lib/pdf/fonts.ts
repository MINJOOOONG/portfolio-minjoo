import { Font } from "@react-pdf/renderer";

export function registerFonts() {
  Font.register({
    family: "NotoSansKR",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.ttf",
        fontWeight: 400,
      },
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-500-normal.ttf",
        fontWeight: 500,
      },
      {
        src: "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.ttf",
        fontWeight: 700,
      },
    ],
  });

  // Disable hyphenation for Korean text
  Font.registerHyphenationCallback((word) => [word]);
}
