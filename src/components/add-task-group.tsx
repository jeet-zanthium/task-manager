import { useAddTaskGroup } from "@/stores/task-group-store";
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
import { Input } from "./ui/input";

export const AddTaskGroup = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const addTaskGroup = useAddTaskGroup();

  const handleAddTaskGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    addTaskGroup(name);

    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-1" /> Add Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddTaskGroup}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue="New Group"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Group</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
