import { TaskItem } from "./TaskItem";

export function TaskList({ tasks, toggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleTask={toggleTask}></TaskItem>
      ))}
    </ul>
  );
}
