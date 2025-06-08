import { notFound } from "next/navigation";
import { prisma } from "@/core/prisma";

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
}

export default async function BoardPage(props: PageProps) {
  const board = await prisma.board.findUnique({
    where: {
      id: props.params.id,
    },
    
  });

  if (!board) {
    return notFound();
  }

  return (
    <div className="container mx-auto h-content flex flex-col">
      <h1 className="text-white text-4xl text-center mb-8">{board.title}</h1>
      <div className="flex flex-1">
        <div className="block w-full p-4  border  rounded-lg shadow-sm dark:bg-gray-800 border-gray-700 ">
          <div>
            <h5 className="text-lg font-bold tracking-tight  text-white">
            {/* {board.title} */}
            Column name
          </h5>
          <div className="text-white">444</div>
          </div>
        </div>
      </div>
    </div>
  );
}
