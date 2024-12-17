import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Task = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export type TaskGroup = {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: string;
};

type TaskGroupStoreState = {
  taskGroups: TaskGroup[];
};

type TaskGroupStoreActions = {
  addTaskGroup: (name: string) => void;
  removeTaskGroup: (taskGroupId: string) => void;
  addTask: (taskGroupId: string, task: string) => void;
  removeTask: (taskGroupId: string, taskId: string) => void;
  updateTask: (taskGroupId: string, task: Pick<Task, "id" | "task">) => void;
  toggleTask: (taskGroupId: string, taskId: string) => void;
};

type TaskGroupStore = TaskGroupStoreState & TaskGroupStoreActions;

const useTaskGroupStore = create<TaskGroupStore>()(
  persist(
    immer((set) => ({
      taskGroups: [] as TaskGroup[],
      addTaskGroup(name) {
        set((state) => {
          state.taskGroups.push({
            id: crypto.randomUUID(),
            name,
            tasks: [],
            createdAt: new Date().toISOString(),
          });
        });
      },
      removeTaskGroup(taskGroupId) {
        set((state) => {
          state.taskGroups = state.taskGroups.filter(
            (taskGroup) => taskGroup.id !== taskGroupId
          );
        });
      },
      addTask(taskGroupId, task) {
        set((state) => {
          const taskGroup = state.taskGroups.find(
            (taskGroup) => taskGroup.id === taskGroupId
          );
          if (taskGroup) {
            taskGroup.tasks.push({
              id: crypto.randomUUID(),
              task,
              completed: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              completedAt: null,
            });
          }
        });
      },
      removeTask(taskGroupId, taskId) {
        set((state) => {
          const taskGroup = state.taskGroups.find(
            (taskGroup) => taskGroup.id === taskGroupId
          );
          if (taskGroup) {
            taskGroup.tasks = taskGroup.tasks.filter(
              (task) => task.id !== taskId
            );
          }
        });
      },
      updateTask(taskGroupId, task) {
        set((state) => {
          const taskGroup = state.taskGroups.find(
            (taskGroup) => taskGroup.id === taskGroupId
          );
          if (taskGroup) {
            const taskIndex = taskGroup.tasks.findIndex(
              (t) => t.id === task.id
            );
            if (taskIndex !== -1) {
              taskGroup.tasks[taskIndex].task = task.task;
              taskGroup.tasks[taskIndex].updatedAt = new Date().toISOString();
            }
          }
        });
      },
      toggleTask(taskGroupId, taskId) {
        set((state) => {
          const taskGroup = state.taskGroups.find(
            (taskGroup) => taskGroup.id === taskGroupId
          );
          if (taskGroup) {
            const taskIndex = taskGroup.tasks.findIndex((t) => t.id === taskId);
            if (taskIndex !== -1) {
              taskGroup.tasks[taskIndex].completed =
                !taskGroup.tasks[taskIndex].completed;
              if (taskGroup.tasks[taskIndex].completed) {
                taskGroup.tasks[taskIndex].completedAt =
                  new Date().toISOString();
              }
            }
          }
        });
      },
    })),
    { name: "task-group-store" }
  )
);

export const useTaskGroups = () =>
  useTaskGroupStore((state) => state.taskGroups);

export const useAddTaskGroup = () =>
  useTaskGroupStore((state) => state.addTaskGroup);

export const useRemoveTaskGroup = () =>
  useTaskGroupStore((state) => state.removeTaskGroup);

export const useAddTask = () => useTaskGroupStore((state) => state.addTask);

export const useRemoveTask = () =>
  useTaskGroupStore((state) => state.removeTask);

export const useUpdateTask = () =>
  useTaskGroupStore((state) => state.updateTask);

export const useToggleTask = () =>
  useTaskGroupStore((state) => state.toggleTask);
