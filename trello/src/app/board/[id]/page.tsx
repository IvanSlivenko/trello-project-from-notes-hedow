import { notFound } from "next/navigation";
import { prisma } from "@/core/prisma";
import { ColumnsList } from "@/app/components/columns-list.component";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: PageProps) {
  const board = await prisma.board.findUnique({
    where: { id: params.id },
    include: {
      columns: {
        orderBy: {
          order: "asc"
        },
        include: {
          cards: true,
        },
      },
    },
  });

  if (!board) return notFound();

  return (
    <>
    <div className="container mx-auto">
      <h1 className="text-white text-4xl text-center mb-8">{board.title}</h1>
      <ColumnsList board={board} />
    </div>
    </>
  );
}
