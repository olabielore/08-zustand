import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";


type NoteModalPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage ({ params }: NoteModalPageProps) {

  const { id } = await params;

  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
  });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        
          <NotePreview id={id} />
       
      </HydrationBoundary>
      );
};
