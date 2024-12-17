import { useUpdateTask } from "@/stores/task-group-store";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type EditTaskProps = { taskGroupId: string; task: string; id: string };

export const EditTask = ({ taskGroupId, task, id }: EditTaskProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const editTask = useUpdateTask();

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const task = formData.get("task") as string;

    editTask(taskGroupId, { id, task });

    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-sky-500 text-white hover:bg-sky-500/90"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEditTask}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Textarea
                id="task"
                name="task"
                defaultValue={task}
                className="col-span-3"
                rows={1}
                required
                onInput={(e) => {
                  const target = e.currentTarget;
                  target.style.height = "auto"; // Reset height to auto
                  target.style.height = `${target.scrollHeight}px`; // Adjust height to content
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
