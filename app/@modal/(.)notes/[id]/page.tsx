import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById, getQueryClient } from "@/lib/api";

import NotePreview from "./NotePreview.client";

interface NoteModalProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalProps) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
