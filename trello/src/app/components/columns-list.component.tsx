"use client";

import { BoardPayload, useBoardQuery } from "@/hooks/use-board-query";
import { CreateColumn } from "./create-column.component";
import { Column } from "./column.component";

interface ColumnsListProps {
  board: BoardPayload;
}

export function ColumnsList({ board }: ColumnsListProps) {
  const { data } = useBoardQuery({ initialData: board });
  return (
    <div className="flex flex-1 gap-5 overflow-x-scroll scrollbar-custom w-full h-content  pb-5">
      {data?.columns.map((column, index) => {
        return <Column  key={`column-${column.id}`} column={column} />;
      })}

      <CreateColumn boardId={board.id} />
    </div>
  );
}
