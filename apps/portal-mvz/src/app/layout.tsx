import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";

export const metadata: Metadata = {
  title: "Portal MVZ · Kate & Doug",
  description: "Dashboard para médicos veterinarios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="antialiased font-sans">
      <body className="font-sans">
        <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
          <SidebarConfigProvider>
            {children}
          </SidebarConfigProvider>
        </ThemeProvider>
        <Script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=3f25e427-eacc-4e5c-a2a6-5090a6478dc4" strategy="afterInteractive" />
      </body>
    </html>
  );
}
