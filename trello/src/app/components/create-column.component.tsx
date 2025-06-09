import { useForm } from "react-hook-form";
import { Input } from "./input.component";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateBoard } from "@/hooks/use-create-board";

const createColumnSchema = z.object({
  title: z.string().min(1).max(20),
});

type CreateColumnValues = z.infer<typeof createColumnSchema>;

export function CreateColumn() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateColumnValues>({
    resolver: zodResolver(createColumnSchema),
  });

  const { mutateAsync } = useCreateBoard();

  const onSubmit = handleSubmit( async (values) => {
    await mutateAsync(values);
    setIsFormOpened(false);
    
  });

  const openForm = () => setIsFormOpened(true);

  return (
    <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg cursor-pointer shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    onClick={openForm}
    >
      {isFormOpened ? (
        <form onSubmit={onSubmit}>
          <Input 
          {...register("title")} 
          placeholder="Вкажіть назву нової Column" 
          error={errors.title?.message} 
          disabled={isSubmitting}
          />
        </form>
      ) : (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          + Create a new column
        </h5>
      )}
    </div>
  );
}
