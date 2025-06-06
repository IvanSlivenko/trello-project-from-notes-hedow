import { api } from "@/core/api";
import { Board } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const getBoardsFn = async () => {
  const response = await api.get<Board[]>("/api/boards");
  return response.data;
};

interface UseBoardsOptions {
  initialData: Board[];
}

export const useBoardsQueryKey = ["board"];

export const useBoards = ({ initialData }: UseBoardsOptions) => {
  const query = useQuery({
    queryKey: useBoardsQueryKey,
    queryFn: getBoardsFn,
    initialData,
  });
  return query;
};
