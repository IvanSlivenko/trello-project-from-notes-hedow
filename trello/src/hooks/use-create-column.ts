import { CreateColumnDto } from "@/app/api/columns/dto";
import { api } from "@/core/api";
import { Column } from "@prisma/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardsQueryKey } from "./use-boards";

const createColumnFn = async (column: CreateColumnDto) => {
  
    const { data } = await api.post<Column>("/api/columns", column);
    return data;

  // const response = await api.post<Board>("/api/boards", board);
  // return response.data;
};

export const useCreateColumnMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutationKey: ["create-board"],
    mutationFn: createColumnFn,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: useBoardsQueryKey });
    },
  });

  return mutation;
};
