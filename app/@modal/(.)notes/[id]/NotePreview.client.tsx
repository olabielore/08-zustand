"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

import css from "./NotePreview.module.css";

type NotePreviewProps = {
  id: string;
};

export default function NotePreview({ id }: NotePreviewProps) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
        <p>Loading...</p>
    );
  }

  if (isError) return (
      <p>Error loading notes</p>
  );

  if (!data) {
    return (
        <p>Note not found</p>
    );
  }

  return (
      <div>
        <h2 className={css.title}>{data.title}</h2>
        <p className={css.content}>{data.content}</p>
        <span className={css.tag}>{data.tag}</span>
      </div>
  );
}
