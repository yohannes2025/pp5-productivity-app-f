import React, { useState, useEffect } from "react";
import PriorityDropdown from "./PriorityDropdown";
import CategoryDropdown from "./CategoryDropdown";
import StateDropdown from "./StateDropdown";
import { getPriorities, getCategories, getStates } from "../api";

const FilterForm = ({ onFilter }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isOverdue, setIsOverdue] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");

  const handleFilter = () => {
    const filters = {};
    if (title) filters.title = title;
    if (dueDate) filters.due_date = dueDate;
    if (isOverdue !== "") filters.is_overdue = isOverdue === "true";
    if (priority) filters.priority = priority;
    if (category) filters.category = category;
    if (state) filters.state = state;
    onFilter(filters);
  };

  const handleReset = () => {
    setTitle("");
    setDueDate("");
    setIsOverdue("");
    setPriority("");
    setCategory("");
    setState("");
    onFilter({}); // Clear filters
  };

  return (
    <div>
      <h2>Filter Tasks</h2>
      <div>
        <label htmlFor="filterTitle">Title:</label>
        <input
          type="text"
          id="filterTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="filterDueDate">Due Date:</label>
        <input
          type="datetime-local"
          id="filterDueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="filterIsOverdue">Is Overdue:</label>
        <select
          value={isOverdue}
          onChange={(e) => setIsOverdue(e.target.value)}
        >
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label htmlFor="filterPriority">Priority:</label>
        <PriorityDropdown
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="filterCategory">Category:</label>
        <CategoryDropdown
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="filterState">State:</label>
        <StateDropdown
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleReset}>Reset Filters</button>
    </div>
  );
};

export default FilterForm;
