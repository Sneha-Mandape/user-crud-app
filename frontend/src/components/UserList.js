import React, { useEffect, useState } from 'react';

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

const fetchUsers = () => {
  fetch("http://localhost/user-crud-app/backend/routes/read_users.php")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]); // fallback if no users or error
      }
    })
    .catch(() => setUsers([]));
};


  const deleteUser = (id) => {
    fetch("http://localhost/user-crud-app/backend/routes/delete_users.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    }).then(() => fetchUsers());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? <p>No users found.</p> : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>DOB</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>
                  <button onClick={() => onEdit(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
