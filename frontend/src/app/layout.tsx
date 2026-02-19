import { GoogleAnalytics } from '@next/third-parties/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guia Guapimirim",
  description: "O melhor da cidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
      {/* Insira aqui o seu ID de Medição */}
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}