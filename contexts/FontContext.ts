import React from "react";

export const SupportedFonts = [
  "Lora",
  "Arial",
  "Dank Mono",
  "Beaufort Bold",
  "Poppins",
  "Source Code Pro",
  "Afterglow",
] as const;

export type AvailableFonts = typeof SupportedFonts[number];

export const FontContext = React.createContext<{
  font: AvailableFonts;
  setFont: React.Dispatch<React.SetStateAction<AvailableFonts | null>>;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number | null>>;
  lineHeight: string;
  setLineHeight: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  font: "Lora",
  setFont: (font: AvailableFonts) => {},
  fontSize: 160,
  setFontSize: (fontSize: number) => {},
  lineHeight: "1.75",
  setLineHeight: (lineHeight: string) => {},
});

export default FontContext;
