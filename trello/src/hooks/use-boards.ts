import { api } from "@/core/api";
import { Board } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const getBoardsFn = async () => {
  const data = await api.get<Board[]>("/api/board");
  return data;
};

interface UseBoardsOptions {
  initialData: Board[];
}

export const useBoards = ({ initialData }: UseBoardsOptions) => {
  const {} = useQuery({
    queryKey: ["board"],
    queryFn: getBoardsFn,
    initialData,
  });
};
