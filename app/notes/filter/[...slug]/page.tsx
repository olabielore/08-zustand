import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilteredPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: FilteredPageProps): Promise<Metadata> {
  const { slug } = await params;

  const [tag = "all"] = slug;

  const generateTag = tag === "all" ? "All notes" : `Notes filtered by ${tag}`;

  return {
    title: generateTag,
    description: `Browse ${generateTag.toLowerCase()} in NoteHub`,
    openGraph: {
      title: "List of notes",
      description: `Browse ${generateTag.toLowerCase()} in NoteHub`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: generateTag,
        },
      ],
    },
  };
}
 
  export default async function FilteredNotesPage({ params }: FilteredPageProps) {
    const { slug } = await params;

    const tag = slug[0] === "all" ? undefined : slug[0];
    const search = slug[1] ?? "";

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["notes", 1, search, tag],
      queryFn: () =>
        fetchNotes({
          page: 1,
          perPage: 12,
          search,
          tag,
        }),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    );
};
