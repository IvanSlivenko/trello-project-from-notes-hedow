import { BoardCard } from "./components/board-card.components";
import { prisma } from "@/core/prisma"

export default async function Home() {

  const boards = await prisma.board.findMany();

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
  {
    boards.map((CurBoard)=>(
      <BoardCard key={CurBoard.id} id={CurBoard.id} title={CurBoard.title} />
    ))
  }
      </div>
    </div>
  );
}
