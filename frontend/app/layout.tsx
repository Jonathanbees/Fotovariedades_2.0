import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Configuración optimizada de la fuente Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Fotovariedades",
  description: "Descripción de tu proyecto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      <head>
        {/* Importación de Material Icons Outlined */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      {/* 
        Aplicamos la fuente 'font-body' configurada en el theme y 
        colores de fondo por defecto para el modo claro y oscuro 
      */}
      <body className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-body transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}