
import type { Metadata } from "next";
import { Roboto } from 'next/font/google';

import "./globals.css";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple and efficient note-taking application',
  openGraph: {
    title: "NoteHub",
    description: 'A simple and efficient note-taking application',
    url: "https://notehub.com",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />

          <main>
            {children}
          </main>

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
