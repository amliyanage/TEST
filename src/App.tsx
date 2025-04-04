import React, { useEffect, useState } from "react";
import "./App.css";
import { User } from "./model/User";
import UserService from "./Services/UserService";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    uid: "",
    name: "",
    email: "",
    given_name: "",
    middle_name: "",
    family_name: "",
    nickname: "",
    phone_number: "",
    comment: "",
    picture: "",
    directory: "",
    metadata: {},
    tags: [],
  });

  const fetchUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UserService.createUser(formData);
      setFormData({
        uid: "",
        name: "",
        email: "",
        given_name: "",
        middle_name: "",
        family_name: "",
        nickname: "",
        phone_number: "",
        comment: "",
        picture: "",
        directory: "",
        metadata: {},
        tags: [],
      });
      fetchUsers();
      alert("User created successfully!");
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Weavy User Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="uid"
          placeholder="UID"
          value={formData.uid}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="given_name"
          placeholder="Given Name"
          value={formData.given_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="middle_name"
          placeholder="Middle Name"
          value={formData.middle_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="family_name"
          placeholder="Family Name"
          value={formData.family_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <input
          type="text"
          name="picture"
          placeholder="Profile Picture URL"
          value={formData.picture}
          onChange={handleChange}
        />
        <input
          type="text"
          name="directory"
          placeholder="Directory"
          value={formData.directory}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={(formData.tags || []).join(", ")}
          onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value.split(", ") })
          }
        />
        <button type="submit">Create User</button>
      </form>

      <h3>Users List</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
              <div>UID: {user.uid}</div>
              <div>Given Name: {user.given_name}</div>
              <div>Middle Name: {user.middle_name}</div>
              <div>Family Name: {user.family_name}</div>
              <div>Nickname: {user.nickname}</div>
              <div>Phone: {user.phone_number}</div>
              <div>Comment: {user.comment}</div>
              <div>Tags: {user.tags?.join(", ")}</div>
              <div>Directory: {user.directory}</div>
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
