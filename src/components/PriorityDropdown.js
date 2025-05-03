import React, { useState, useEffect } from "react";
import { getPriorities } from "../api";

const PriorityDropdown = ({ value, onChange }) => {
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    getPriorities()
      .then((response) => setPriorities(response.data))
      .catch((error) => console.error("Error fetching priorities:", error));
  }, []);

  return (
    <select value={value} onChange={onChange}>
      <option value="">Select Priority</option>
      {priorities.map((priority) => (
        <option key={priority.id} value={priority.id}>
          {priority.name}
        </option>
      ))}
    </select>
  );
};

export default PriorityDropdown;
