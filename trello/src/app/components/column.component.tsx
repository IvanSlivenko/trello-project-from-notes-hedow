"use client";
import { ColumnPayload, useColumnQuery } from "@/hooks/use-column-query";
import { Column } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

interface ColumnProps {
  column: ColumnPayload;
}

const MIN_WIDTH = 200;

export function Column({ column }: ColumnProps) {

  const { data }= useColumnQuery({ initialData: column})

  // change resize
  const initialDragXTwo = useRef<number>(0);
  const [width, setWidth] = useState(data.width);

  const onResizeStart = (e: React.DragEvent<HTMLDivElement>) => {
    initialDragXTwo.current = e.clientX;
  };

  const onResize = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.clientX === 0) return;

    const movedBy = e.clientX - initialDragXTwo.current;
    initialDragXTwo.current = e.clientX;
    // setWidth((width) => width + movedBy);
    setWidth((width) => {
      const newWidth = width + movedBy;
      if (newWidth < MIN_WIDTH) return MIN_WIDTH;
      return newWidth;
    });
  };

  return (
    <div
      // style={{ minWidth: column.width, width: column.width }}
      style={{ minWidth: width, width }}
      className="block  w-full p-4  border  rounded-lg shadow-sm dark:bg-gray-800 border-gray-700 relative"
    >
      <div className="">
        <h5 className="text-lg font-bold tracking-tight  text-white">
          {data.title}
        </h5>
        <div
          className="absolute right-0 top-0  text-white cursor-move w-1 h-full bg-gray-700 select-none opacity-0"
          draggable
          onDragStart={onResizeStart}
          onDrag={onResize}
        ></div>
      </div>
    </div>
  );
}
