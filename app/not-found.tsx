"use client";

import css from "./not-found.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [router]);

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
