import { useState, useEffect } from "react";
import "./TaskList.css"

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
                const data = await response.json();
                const user = sessionStorage.getItem("username");
                const userTasks = data.filter(task => task.assignedTo === user);
                setTasks(userTasks);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };

        fetchTasks();
    }, [refresh]);

    const handleComplete = async (taskId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "Completed" }),
            });

            if (response.ok) {

                setTasks(tasks.map(task =>
                    task._id === taskId ? { ...task, status: "Completed" } : task
                ));
                setMessage('Task marked as completed.');
            } else {
                setMessage('Failed to update task.');
            }
        } catch (err) {
            console.error("Error updating task:", err);
            setMessage('Server error.');
        }
        setRefresh(!refresh)
    };

    return (
        <div className="task-list">
            {message && <p>{message}</p>}
            <div className="task-container">
                {tasks?.length > 0 ? tasks.map(task => (
                    <div className="task-card" key={task.id} style={{ marginBottom: "1rem" }}>
                        <strong>{task.title}</strong><br />
                        <p>{task.description}</p><br />
                        <span>Status: {task.status}</span><br />
                        {task.status !== "Completed" && (
                            <button onClick={() => handleComplete(task.id)}>
                                Mark as Completed
                            </button>
                        )}
                    </div>
                )) : "No tasks to show"}
            </div>
        </div>
    );
}