"use client";

import { PlantProvider } from "@/context/PlantContext";

export default function PlantProviderWrapper({ children }) {
  return <PlantProvider>{children}</PlantProvider>;
}
