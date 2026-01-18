"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function NotesFilterError({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
      <br />
      <Link href="/notes">Back to notes</Link>
    </div>
  );
}
