"use client";

import { HortusProvider } from "@/context/HortusContext"; // Assicurati che il percorso sia corretto

export default function HortusProviderWrapper({ children }) {
  return <HortusProvider>{children}</HortusProvider>;
}