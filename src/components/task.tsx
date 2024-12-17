import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Task as TaskType,
  useRemoveTask,
  useToggleTask,
} from "@/stores/task-group-store";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { Check, CheckCheck, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
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
import { EditTask } from "./edit-task";

type TaskProps = TaskType & {
  taskGroupId: string;
};

export const Task = ({
  id,
  task,
  completed,
  createdAt,
  updatedAt,
  completedAt,
  taskGroupId,
}: TaskProps) => {
  const removeTask = useRemoveTask();
  const toggleTask = useToggleTask();

  const handleRemoveTask = () => {
    removeTask(taskGroupId, id);
  };

  const handleToggleTask = () => {
    toggleTask(taskGroupId, id);
  };

  return (
    <Card key={id} className="relative">
      <p className="italic text-xs text-muted-foreground absolute top-2 right-4">
        {dayjs(createdAt).format("MMMM D, YYYY, h:mm A")}
      </p>
      <CardContent className="pt-5 pb-0">{task}</CardContent>
      <CardFooter className="justify-between">
        <p className="italic text-xs text-muted-foreground">
          Last Updated: {dayjs(updatedAt).fromNow()}
        </p>
        <div className="flex gap-2">
          <EditTask taskGroupId={taskGroupId} task={task} id={id} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                className="bg-rose-500 text-white hover:bg-rose-500/90"
              >
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your task.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleRemoveTask}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {completed ? (
            <AlertDialog>
              <TooltipProvider>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        className="bg-green-500 text-white hover:bg-green-500/90"
                      >
                        <CheckCheck />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{dayjs(completedAt).format("MMMM D, YYYY, h:mm A")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to mark this task as incomplete?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleToggleTask}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              size="icon"
              className="bg-gray-500 text-white hover:bg-gray-500/90"
              onClick={handleToggleTask}
            >
              <Check />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
