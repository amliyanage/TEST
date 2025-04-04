import React, { useEffect, useState } from 'react';
import './App.css';
import { User } from './model/User';
import UserService from './Services/UserService';

function App() {

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>Weavy User Management</h2>

      <h3>Users List</h3>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user: any) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
              ))
            ) : (
              <li>No users found.</li>
          )}
      </ul>
    </div>
  );
}

export default App;
