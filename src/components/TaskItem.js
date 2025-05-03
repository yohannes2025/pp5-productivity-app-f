import React from "react";

const TaskItem = ({
  task,
  onDelete,
  onEdit,
  onMarkOverdue,
  onMarkNotOverdue,
}) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.due_date && (
        <p>Due Date: {new Date(task.due_date).toLocaleString()}</p>
      )}
      <p>Priority: {task.priority?.name || "N/A"}</p>
      <p>Category: {task.category?.name || "N/A"}</p>
      <p>State: {task.state?.name || "N/A"}</p>
      {task.is_overdue && <p style={{ color: "red" }}>Overdue</p>}
      {task.attachment && (
        <p>
          <a href={task.attachment} target="_blank" rel="noopener noreferrer">
            Attachment
          </a>
        </p>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => onEdit(task)}>Edit</button>
      {!task.is_overdue &&
        task.due_date &&
        new Date(task.due_date) < new Date() && (
          <button onClick={() => onMarkOverdue(task.id)}>Mark Overdue</button>
        )}
      {task.is_overdue && (
        <button onClick={() => onMarkNotOverdue(task.id)}>
          Mark Not Overdue
        </button>
      )}
      {/* Display assigned users here */}
    </div>
  );
};

export default TaskItem;
