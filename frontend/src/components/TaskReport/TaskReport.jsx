import { useState, useEffect } from "react";
import "./TaskReport.css"

export default function TaskReport() {
    const [completionRate, setCompletionRate] = useState({ total: 0, completed: 0 });
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
                const data = await response.json();
                setTasks(data);
                const total = data.length;
                const completed = data.filter(task => task.status === "Completed").length;
                setCompletionRate({ total, completed });

            } catch (err) {
                console.error("Error loading reports:", err);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginBottom: "1rem" }}>
                <strong>Completion Rate:</strong> {completionRate.completed} / {completionRate.total}
            </div>
        </div>
    );
}