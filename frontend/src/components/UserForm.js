import React, { useEffect, useState } from "react";

function UserForm({ editingUser, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
  }, [editingUser]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingUser
      ? "http://localhost/user-crud-app/backend/routes/update_users.php"
      : "http://localhost/user-crud-app/backend/routes/create_users.php";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ name: "", email: "", password: "", dob: "" });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

export default UserForm;
