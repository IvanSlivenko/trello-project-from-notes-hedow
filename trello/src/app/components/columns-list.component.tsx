"use client";

import { BoardPayload, useBoardQuery } from "@/hooks/use-board-query";
import { CreateColumn } from "./create-column.component";

interface ColumnsListProps {
  board: BoardPayload;
}

export function ColumnsList({ board }: ColumnsListProps) {
  const { data } = useBoardQuery({ initialData: board });
  return (
    <div className="flex flex-1 gap-5 overflow-x-scroll scrollbar-custom w-full h-content  pb-5">
      {data?.columns.map((column) => {
        return (
          <div
            key={column.id}
            // style={{minWidth: 700}}
            // style={{width: column.width}}
            style={{minWidth: column.width, width: column.width}}
            className="block  w-full p-4  border  rounded-lg shadow-sm dark:bg-gray-800 border-gray-700 "
          >
            <div>
              <h5 className="text-lg font-bold tracking-tight  text-white">
                {/* {board.title} */}
                {column.title}
              </h5>
            </div>
          </div>
        );
      })}
      <CreateColumn boardId={board.id}/>
    </div>
  );
}
