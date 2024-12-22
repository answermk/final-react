import React, { useState, useEffect } from "react";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "" });

    useEffect(() => {
        // Fetch existing users from the database or local storage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const handleAddUser = () => {
        const updatedUsers = [...users, { ...newUser }];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setNewUser({ name: "", email: "" });
    };

    const handleDeleteUser = (email) => {
        const updatedUsers = users.filter((user) => user.email !== email);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    return (
        <div>
            <h2>User Management</h2>
            <div>
                <h3>Add New User</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>

            <h3>Existing Users</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.email}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
