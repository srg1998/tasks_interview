import { useState, useEffect } from "react"
import "./TaskForm.css"

export default function TaskForm() {
    const [users, setUsers] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [assignedUser, setAssignedUser] = useState('')

    const [message, setMessage] = useState()

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const task = {
            title,
            description,
            assignedTo: assignedUser,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Task added successfully');
                setTitle('');
                setDescription('');
                setAssignedUser('');
            } else {
                setMessage(result.message || 'Error adding task');
            }
        } catch (err) {
            setMessage('Server error');
        }
    };


    return users ? <>  <div className="task-form">

        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description:</label>
                <textarea
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-row">
                <label>Assign To:</label>
                <select
                    value={assignedUser}
                    required
                    onChange={(e) => setAssignedUser(e.target.value)}
                >
                    <option value="">-- Select User --</option>
                    {users.map((user) => (
                        <option key={user.username} value={user.username}>
                            {user.username} ({user.role})
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Add Task</button>
        </form>
        {message && <p>{message}</p>}
    </div></>
        : "loading"

}