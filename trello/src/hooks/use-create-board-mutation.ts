import { createBoardDto } from "@/app/api/boards/dto";
import { api } from "@/core/api";
import { Board } from "@prisma/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardsQueryKey } from "./use-boards-query";

const createBoardFn = async (board: createBoardDto) => {
  
    const { data } = await api.post<Board>("/api/boards", board);
    return data;

  // const response = await api.post<Board>("/api/boards", board);
  // return response.data;
};

export const useCreateBoardMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-board"],
    mutationFn: createBoardFn,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: useBoardsQueryKey });
    },
  });

  return mutation;
};
