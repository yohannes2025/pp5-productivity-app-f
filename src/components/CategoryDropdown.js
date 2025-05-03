import React, { useState, useEffect } from "react";
import { getCategories } from "../api";

const CategoryDropdown = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <select value={value} onChange={onChange}>
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;
