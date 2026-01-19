"use client";

import css from "../NoteForm/NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} >
        <div className={css.formGroup}>
          <label >Title</label>
          <input
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
          required
          />
        </div>

        <div className={css.formGroup}>
          <label >Content</label>
          <textarea
          name="content"
          value={draft.content}
          onChange={handleChange}
          rows={8}
          className={css.textarea}
          />
        </div>

        <div className={css.formGroup}>
          <label >Tag</label>
          <select name="tag" className={css.select} value={draft.tag}
          onChange={handleChange}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => router.back()}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={mutation.isPending}
            className={css.submitButton}
          >
            {mutation.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
    </form>
  );
}
