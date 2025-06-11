import { CreateColumnDto as CreateColumnDtoOriginal } from "@/app/api/columns/dto";
import { api } from "@/core/api";
import { Column } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardsQueryKey } from "./use-boards";


type CreateColumnDto = Omit<CreateColumnDtoOriginal, 'width'>;

const createColumnFn = async (column: CreateColumnDto) => {
  
    const { data } = await api.post<Column>("/api/columns", column);
    return data;

  // const response = await api.post<Board>("/api/boards", board);
  // return response.data;
};

interface UseCreateColumnMutationOptions {
  boardId: string;
}

export const useCreateColumnMutation = ({ boardId }: UseCreateColumnMutationOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutationKey: ["create-board"],
    mutationFn: createColumnFn,
    onSuccess: ()=>{
      const data = queryClient.getQueryData(['board', boardId]);
      console.log('data', data);
    }
  });

  return mutation;
};
