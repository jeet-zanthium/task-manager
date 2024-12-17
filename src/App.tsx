import { ModeToggle } from "./components/mode-toggle";
import { AddTaskGroup } from "./components/add-task-group";
import { TaskGroups } from "./components/task-groups";

const App = () => {
  return (
    <section className="max-w-screen-md mx-auto px-4">
      <header className="z-[999] fixed top-4 left-1/2 -translate-x-1/2 flex w-[calc(100%-2rem)] max-w-[calc(768px-2rem)] justify-between items-center px-4 py-2 border rounded-lg shadow-lg backdrop-blur-sm">
        <p className="font-black tracking-wider text-xl leading-none">
          TASK MANAGER
        </p>
        <ModeToggle />
      </header>
      <main className="py-24 flex flex-col gap-6">
        <AddTaskGroup />
        <TaskGroups />
      </main>
    </section>
  );
};

export default App;
