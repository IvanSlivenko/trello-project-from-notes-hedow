"use client";

import { Board } from "@prisma/client";
import { BoardCard } from "./board-card.components";
import { useQuery } from "@tanstack/react-query";

interface BoardsList {
  initialData: Board[];
}

export function BoardsList({ initialData}: BoardsList) {



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
  {
    boards.map((CurBoard)=>(
      <BoardCard key={CurBoard.id} id={CurBoard.id} title={CurBoard.title} />
    ))
  }
      </div>
    )
}
