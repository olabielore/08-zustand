"use client";

import React from "react";
import SidebarNotes from "@/app/notes/filter/@sidebar/SidebarNotes/SidebarNotes";
import css from "./LayoutNotes.module.css";

interface LayoutNotesProps {
  children: React.ReactNode;
}

export default function LayoutNotes({ children }: LayoutNotesProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>

      <main className={css.notesWrapper}>
        {children}
      </main>
    </div>
  );
}

