
import type { Metadata } from "next";
import css from "./not-found.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'NoteHub | Page not found',
  description: 'The page does not exist',
  openGraph: {
    title: 'NoteHub | Page not found',
    description: 'The page does not exist',
    url: "https://notehub.com/404",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};
  
  
export default function NotFound() {

  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <Link href="/">Back to Home Page</Link>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
