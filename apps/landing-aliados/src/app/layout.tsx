import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title: "Veterinarias Aliadas KD",
  description: "Plataforma de gestión para veterinarias aliadas de Kate & Doug.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="antialiased">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/tgx2nod.css" />
      </head>
      <body>
        <ThemeProvider defaultTheme="light" forcedTheme="light" storageKey="kd-theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
