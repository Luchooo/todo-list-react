export function TaskItem({ task, toggleTask }) {
  const { id, description, isFinished } = task;

  const handleOnChage = () => {
    toggleTask(id);
  };

  return (
    <li className="flex items-center p-4 bg-white border-b border-slate-200 ">
      <input type="checkbox" checked={isFinished} onChange={handleOnChage} />
      <label
        onClick={handleOnChage}
        className={
          "px-4 cursor-pointer " +
          (isFinished ? "line-through decoration-red-600 decoration-wavy" : "")
        }
      >
        {description}
      </label>
    </li>
  );
}
