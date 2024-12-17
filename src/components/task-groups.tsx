import { useTaskGroups } from "@/stores/task-group-store";
import { TaskGroup } from "./task-group";

export const TaskGroups = () => {
  const taskGroups = useTaskGroups();

  return taskGroups.map((taskGroup) => (
    <TaskGroup key={taskGroup.id} {...taskGroup} />
  ));
};
