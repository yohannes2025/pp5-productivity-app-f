import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterForm from './components/FilterForm';
import { getTasks, deleteTask, markTaskOverdue, markTaskNotOverdue } from './api';

function App() {
    const [tasks, setTasks] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchTasks(filters);
    }, [filters]);

    const fetchTasks = (currentFilters) => {
        getTasks(currentFilters)
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    };

    const handleCreateTask = () => {
        setIsCreating(true);
        setEditingTask(null);
    };

    const handleTaskCreated = () => {
        setIsCreating(false);
        fetchTasks(filters);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsCreating(false);
    };

    const handleTaskUpdated = () => {
        setEditingTask(null);
        fetchTasks(filters);
    };

    const handleDeleteTask = (id) => {
        deleteTask(id)
            .then(() => fetchTasks(filters))
            .catch(error => console.error('Error deleting task:', error));
    };

    const handleMarkTaskOverdue = (id) => {
        markTaskOverdue(id)
            .then(() => fetchTasks(filters))
            .catch(error => console.error('Error marking task as overdue:', error));
    };

    const handleMarkTaskNotOverdue = (id) => {
        markTaskNotOverdue(id)
            .then(() => fetchTasks(filters))
            .catch(error => console.error('Error marking task as not overdue:', error));
    };

    const handleFilterChange = (newFilters) =>