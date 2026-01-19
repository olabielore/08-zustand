import { create } from "zustand";
import { persist } from "zustand/middleware";

export const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: typeof initialDraft;
  setDraft: (draft: Partial<typeof initialDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    }
  )
);
