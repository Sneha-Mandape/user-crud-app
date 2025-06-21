import React, { useState, useEffect } from 'react';

const UserForm = ({ editingUser, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        password: '',
        dob: editingUser.dob
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingUser
      ? "http://localhost/user-crud-app/backend/routes/update_users.php"
      : "http://localhost/user-crud-app/backend/routes/create_users.php";

    const method = editingUser ? "PUT" : "POST";

    const payload = { ...formData };
    if (editingUser) {
      payload.id = editingUser.id;
      delete payload.password;
    }

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => {
      setFormData({ name: '', email: '', password: '', dob: '' });
      onSuccess();
    });
  };

  return (
    <div>
      <h2>{editingUser ? 'Update' : 'Add'} User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />
        {!editingUser && (
          <>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            /><br />
          </>
        )}
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">{editingUser ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserForm;
