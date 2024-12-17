import {
  TaskGroup as TaskGroupType,
  useRemoveTaskGroup,
} from "@/stores/task-group-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { ChevronUp, Trash2 } from "lucide-react";
import { Tasks } from "./tasks";
import { AddTask } from "./add-task";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TaskGroupProps = TaskGroupType;

export const TaskGroup = ({ id, name, tasks, createdAt }: TaskGroupProps) => {
  const removeTaskGroup = useRemoveTaskGroup();

  const [show, setShow] = useState(true);

  const handleRemoveTaskGroup = () => {
    removeTaskGroup(id);
  };

  return (
    <Card key={id}>
      <CardHeader className="flex-row flex-wrap justify-between items-center">
        <CardTitle className="leading-none">{name}</CardTitle>
        <div className="flex items-center gap-2">
          <p className="italic text-xs text-muted-foreground">
            {dayjs(createdAt).format("MMMM D, YYYY, h:mm A")}
          </p>
          <button onClick={() => setShow(!show)}>
            <ChevronUp
              className={cn("transition-transform", {
                "rotate-180": !show,
                "rotate-0": show,
              })}
            />
          </button>
        </div>
      </CardHeader>
      {show && (
        <CardContent className="flex flex-col gap-4">
          <Tasks taskGroupId={id} tasks={tasks} />
          <div className="self-end space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-1" /> Remove Group
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your task group and your all tasks associated with it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={handleRemoveTaskGroup}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AddTask taskGroupId={id} />
          </div>
        </CardContent>
      )}
    </Card>
  );
};
