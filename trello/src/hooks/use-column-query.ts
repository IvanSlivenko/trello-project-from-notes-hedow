import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";
import { api } from "@/core/api";

export type ColumnPayload = Prisma.ColumnGetPayload<{
  include: { cards: true };
}>;

const getColumnFn = async (columnId: string) => {
  const { data } = await api.get<ColumnPayload>(`/api/columns/${columnId}`);
  return data;
};

interface UseColumnQueryOptions {
  initialData: ColumnPayload;
}

export const useColumnQuery = ({ initialData }: UseColumnQueryOptions) => {
  const query = useQuery<ColumnPayload>(["column", initialData.id], {
    queryFn: () => getColumnFn(initialData.id),
    initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};
