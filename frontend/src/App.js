import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [editingUser, setEditingUser] = useState(null);
  const [reload, setReload] = useState(false);

  const refresh = () => {
    setEditingUser(null);
    setReload(!reload); // toggles to trigger re-fetch
  };

  return (
    <div className="container">
      <h1>User CRUD App</h1>
      <UserForm editingUser={editingUser} onSuccess={refresh} />
      <UserList onEdit={setEditingUser} key={reload} />
    </div>
  );
}



export default App;
