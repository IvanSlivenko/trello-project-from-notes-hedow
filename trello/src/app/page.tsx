import { BoardsList } from "./components";
import { prisma } from "@/core/prisma"

export default async function Home() {

  const boards = await prisma.board.findMany();

  return (
    <div className="container mx-auto">
      <BoardsList initialData={boards}/>
    </div>
  );
}
