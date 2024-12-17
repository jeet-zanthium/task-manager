import { Task } from "./task";
import { Task as TaskType } from "@/stores/task-group-store";

type TasksProps = {
  taskGroupId: string;
  tasks: TaskType[];
};

export const Tasks = ({ tasks, taskGroupId }: TasksProps) => {
  return tasks.map((task) => (
    <Task key={task.id} {...task} taskGroupId={taskGroupId} />
  ));
};
