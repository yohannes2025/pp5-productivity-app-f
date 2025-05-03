import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  onDeleteTask,
  onEditTask,
  onMarkTaskOverdue,
  onMarkTaskNotOverdue,
}) => {
  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onMarkOverdue={onMarkTaskOverdue}
          onMarkNotOverdue={onMarkTaskNotOverdue}
        />
      ))}
    </div>
  );
};

export default TaskList;
