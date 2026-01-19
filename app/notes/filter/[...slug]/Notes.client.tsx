"use client";

import { useState } from "react";
import { useQuery, keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, deleteNote } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import Link from "next/link";

import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";

import css from "./NotesPage.module.css";

interface NotesClientProps {
    tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 1000);
  const perPage = 12;

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { tag, page, search: debouncedSearch }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search: debouncedSearch,
        tag,
      }),
      placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  
  const handleSearchChange = (tag: string) => {
    setSearch(tag);
    setPage(1); 
  };
    

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
      <SearchBox value={search} onChange={handleSearchChange} />
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />

        <Link href="/notes/action/create" className={css.createButton}>Create note +</Link>
        
      </header>

          <NoteList
            notes={data.notes}
            onDelete={(id) => deleteMutation.mutate(id)}
        />
    </div>
  );
}

