import { api } from "@/core/api";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export type BoardPayload = Prisma.BoardGetPayload<{
    include:{ columns: {include: {cards: true}}}
}>

const getBoardFn = async (boardId: string) => {
  const { data } = await api.get<BoardPayload>(`/api/boards/${boardId}`);

  return data;
};

interface UseBoardsQueryOptions {
  initialData: BoardPayload;
  id: string;
}

export const useBoardQuery = ({ initialData}: UseBoardsQueryOptions) => {
  const query = useQuery({
    queryKey: ["board", initialData.id],
    queryFn: () => getBoardFn(initialData.id),
    initialData,
    // staleTime: Infinity,
  });

  return query;
};
