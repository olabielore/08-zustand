import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilteredPageProps {
  params: Promise<{ slug: string[] }>;
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
}
