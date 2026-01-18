"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

type NotePreviewProps = {
  id: string;
};

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError) return (
    <Modal onClose={handleClose}>
      <p>Error loading notes</p>;
    </Modal>
  );

  if (!data) {
    return (
      <Modal onClose={handleClose}>
        <p>Note not found</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div>
        <h2 className={css.title}>{data.title}</h2>
        <p className={css.content}>{data.content}</p>
        <span className={css.tag}>{data.tag}</span>
      </div>
    </Modal>
  );
}
