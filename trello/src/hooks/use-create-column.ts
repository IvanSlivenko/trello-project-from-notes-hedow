import { CreateColumnDto as CreateColumnDtoOriginal } from "@/app/api/columns/dto";
import { api } from "@/core/api";
import { Column } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardPayload } from "./use-board-query";

type CreateColumnDto = Omit<CreateColumnDtoOriginal, "width">;

const createColumnFn = async (column: CreateColumnDto) => {
  const { data } = await api.post<Column>("/api/columns", column);
  return data;

  // const response = await api.post<Board>("/api/boards", board);
  // return response.data;
};

interface UseCreateColumnMutationOptions {
  boardId: string;
}

export const useCreateColumnMutation = ({
  boardId,
}: UseCreateColumnMutationOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutationKey: ["create-board"],
    mutationFn: createColumnFn,
    onSuccess: (newColumn) => {
      const data = queryClient.getQueryData<BoardPayload>(["board", boardId]);
      console.log(data);

      if (!data) {
        return;
      }

      const newColumns = [...(data.columns ?? []), { ...newColumn, cards: [] }];
      // const columns = [...data.columns];

      // const columns = data.columns ?? [];
      // columns.push({
      //   ...newColumn,
      //   cards: [],
      // });

      // queryClient.setQueryData<BoardPayload>(["board", boardId], (old) => {
      //   ...old!,
      //   columns,
      // }
      //  );

      queryClient.setQueryData<BoardPayload>(["board", boardId], (old) => ({
        ...old!,
        columns: newColumns,
      }));
      console.log("MUTATION DONE");
    },
  });

  return mutation;
};
