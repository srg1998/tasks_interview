import { useEffect, useState } from "react";
import "./DashboardContainer.css";

export default function DashboardContainer() {
    const [userRole, setUserRole] = useState("");
    const [username, setUsername] = useState("");
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const role = sessionStorage.getItem("role");
        const user = sessionStorage.getItem("username");
 
        setUserRole(role);
        setUsername(user);

        fetchTasks();
        if (role === "admin") {
            fetchUsers();
        }
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    
    const userTasks = tasks.filter(task => task.assignedTo === username);
    const completed = (arr) => arr.filter(t => t.status === "Completed").length;
    const pending = (arr) => arr.filter(t => t.status !== "Completed").length;

    return (
        <div className="dashboard">
            <h2>Welcome, {username}</h2>

            {userRole === "admin" ? (
                <>
                    <h3>Admin Dashboard</h3>
                    <p><strong>Total Tasks:</strong> {tasks.length}</p>
                    <p><strong>Pending:</strong> {pending(tasks)} | <strong>Completed:</strong> {completed(tasks)}</p>

                    <h4>All Tasks</h4>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.assignedTo}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length > 0 && (
                        <>
                            <h4>All Users</h4>
                            <ul>
                                {users.map(u => (
                                    <li key={u.username}>{u.username} ({u.role})</li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h3>User Dashboard</h3>
                    <p><strong>Your Tasks:</strong> {userTasks.length}</p>
                    <p><strong>Pending:</strong> {pending(userTasks)} | <strong>Completed:</strong> {completed(userTasks)}</p>

                    <h4>Your Task List</h4>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTasks.map(task => (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}