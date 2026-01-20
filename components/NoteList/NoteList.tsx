"use client";

import type { Note } from "@/lib/types/note";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import css from "./NoteList.module.css";
import Link from "next/link";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <>
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
        
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}
              className={css.link}
              onClick={(e) => {
                e.preventDefault();
                setSelectedNoteId(note.id);
              }}>View details</Link>
        
            <button
              type="button"
              className={css.button}
              onClick={() => deleteMutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
      </ul>
      {selectedNoteId && (
        <Modal onClose={() => setSelectedNoteId(null)}>
          <NotePreview id={selectedNoteId} />
        </Modal>
      )}
      </>
  );
}
