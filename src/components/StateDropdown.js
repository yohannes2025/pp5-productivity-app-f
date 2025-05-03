import React, { useState, useEffect } from "react";
import { getStates } from "../api";

const StateDropdown = ({ value, onChange }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    getStates()
      .then((response) => setStates(response.data))
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  return (
    <select value={value} onChange={onChange}>
      <option value="">Select State</option>
      {states.map((state) => (
        <option key={state.id} value={state.id}>
          {state.name}
        </option>
      ))}
    </select>
  );
};

export default StateDropdown;
