import "./App.css";
import { useEffect, useState } from "react";
import { TaskList } from "./components/task/TaskList";

const keyLocalStorage = "app.tasks";

function App() {
  let cacheTasks = JSON.parse(localStorage.getItem(keyLocalStorage));
  const [tasks, setTasks] = useState(!!cacheTasks ? cacheTasks : []);
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    localStorage.setItem(keyLocalStorage, JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, description: taskDescription, isFinished: false },
    ]);
    setTaskDescription("");
  }

  function handleOnKeyDown(evt) {
    if (evt.key !== "Enter") return;
    if (!taskDescription) return;
    addTask();
  }

  function handleOnChange(evt) {
    setTaskDescription(evt.target.value);
  }

  function deleteTasks() {
    setTasks(tasks.filter((task) => !task.isFinished));
  }

  function toggleTask(taskId) {
    let newTasks = [...tasks];
    const task = tasks.find((task) => task.id === taskId);
    task.isFinished = !task.isFinished;
    setTasks(newTasks);
  }

  return (
    <div className="flex justify-center min-h-screen p-4 bg-slate-200">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="p-2 font-sans text-blue-600 text-lg text-center mt-4 mb-4">
            Tasks
          </h1>
          <div className="flex mb-5">
            <input
              type="text"
              placeholder="Write task"
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              value={taskDescription}
              className="w-full p-4 bg-white rounded flex-1"
            />
            <button
              className={
                "ml-4 " + (!!taskDescription ? "btn-primary" : "btn-disabled")
              }
              onClick={addTask}
            >
              Add task
            </button>
          </div>

          <TaskList tasks={tasks} toggleTask={toggleTask}></TaskList>
          <p className="text-center mt-5">
            {tasks.filter((task) => !!task.isFinished).length} / {tasks.length}
          </p>
          <button className={"w-full mt-5 " + (tasks.length > 0 ? "btn-danger" : "btn-disabled")} onClick={deleteTasks}>
            Delete finished
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
