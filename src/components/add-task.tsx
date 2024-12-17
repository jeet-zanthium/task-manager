import { useAddTask } from "@/stores/task-group-store";
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
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type AddTaskProps = { taskGroupId: string };

export const AddTask = ({ taskGroupId }: AddTaskProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const addTask = useAddTask();

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const task = formData.get("task") as string;

    addTask(taskGroupId, task);

    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-1" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddTask}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Textarea
                id="task"
                name="task"
                placeholder="Do something..."
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
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
