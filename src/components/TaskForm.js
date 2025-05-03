import React, { useState, useEffect } from "react";
import PriorityDropdown from "./PriorityDropdown";
import CategoryDropdown from "./CategoryDropdown";
import StateDropdown from "./StateDropdown";
import { createTask, updateTask } from "../api";

const TaskForm = ({
  task: initialTask,
  onTaskCreated,
  onTaskUpdated,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );
  const [dueDate, setDueDate] = useState(
    initialTask?.due_date ? initialTask.due_date.slice(0, 16) : ""
  );
  const [priorityId, setPriorityId] = useState(initialTask?.priority?.id || "");
  const [categoryId, setCategoryId] = useState(initialTask?.category?.id || "");
  const [stateId, setStateId] = useState(initialTask?.state?.id || "");
  const [attachment, setAttachment] = useState(null);
  const [assignedTo, setAssignedTo] = useState(initialTask?.assigned_to || []); // Needs a way to select users

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskData = new FormData();
    taskData.append("title", title);
    taskData.append("description", description);
    if (dueDate) {
      taskData.append("due_date", dueDate);
    }
    if (priorityId) {
      taskData.append("priority_id", priorityId);
    }
    if (categoryId) {
      taskData.append("category_id", categoryId);
    }
    if (stateId) {
      taskData.append("state_id", stateId);
    }
    if (attachment) {
      taskData.append("attachment", attachment);
    }
    taskData.append("assigned_to", JSON.stringify(assignedTo)); // Backend needs to handle this

    if (initialTask?.id) {
      try {
        await updateTask(initialTask.id, taskData);
        onTaskUpdated();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      try {
        await createTask(taskData);
        onTaskCreated();
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="datetime-local"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="priority">Priority:</label>
        <PriorityDropdown
          value={priorityId}
          onChange={(e) => setPriorityId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <CategoryDropdown
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="state">State:</label>
        <StateDropdown
          value={stateId}
          onChange={(e) => setStateId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="attachment">Attachment:</label>
        <input
          type="file"
          id="attachment"
          onChange={(e) => setAttachment(e.target.files[0])}
        />
      </div>
      {/* Implement UI for selecting/unselecting multiple users for assignedTo */}
      {/* <div>
                <label htmlFor="assignedTo">Assign To:</label>
                <select multiple value={assignedTo} onChange={(e) => setAssignedTo([...e.target.selectedOptions].map(option => parseInt(option.value)))}>
                    {/* Fetch and map users here */}
      {/* </select>
            </div> */}

      <button type="submit">
        {initialTask?.id ? "Update Task" : "Create Task"}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
