import React, { useEffect, useState } from "react";

function UserList({ onEdit }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch(
      "http://localhost/user-crud-app/backend/routes/read_users.php"
    );
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const res = await fetch(
      "http://localhost/user-crud-app/backend/routes/delete_users.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );
    if (res.ok) fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) &&
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td className="actions">
                <button className="edit" onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default UserList;
