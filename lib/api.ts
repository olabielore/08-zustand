
import axios from "axios";
import type { Note } from "../lib/types/note";
import { QueryClient } from "@tanstack/react-query";

const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const  BASE_URL = "https://notehub-public.goit.study/api";

interface FetchNotesProps {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes({ page, perPage, search, tag }: FetchNotesProps): Promise<FetchNotesResponse> {
  
  const response = await axios.get<FetchNotesResponse>(
    `${BASE_URL}/notes`,
    {
      params: {
        page,
        perPage,
        search,
        tag,
      },
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

export async function createNote({ title, content, tag }: CreateNoteProps): Promise<Note> {
  const response = await axios.post<Note>(
    `${BASE_URL}/notes`,
    {
        title,
        content,
        tag,
    },
    {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

export async function deleteNote( id: string ): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, 
      },
    },
  });