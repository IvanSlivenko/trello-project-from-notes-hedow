"use client";

import { Board } from "@prisma/client";
import { BoardCard } from ".";

import { useBoards } from "@/hooks/use-boards";
import { CreateBoard } from "./create-board.component";

interface BoardsList {
  initialData: Board[];
}

export function BoardsList({ initialData }: BoardsList) {
  const { data: boards } = useBoards({ initialData });

  if (!boards || !Array.isArray(boards)) {
    return <div>Loading boards...</div>; // або інший fallback UI
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
      {boards.map((CurBoard) => (
        <BoardCard key={CurBoard.id} id={CurBoard.id} title={CurBoard.title} />
      ))}
      <CreateBoard/>
    </div>
  );
}
