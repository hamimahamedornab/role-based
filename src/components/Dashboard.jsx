import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import "../styles/Dashboard.css";

const Dashboard = ({ currentUser, handleLogout }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setPosts(savedPosts);
    setUsers(savedUsers);
  }, []);

  const savePosts = (updated) => {
    localStorage.setItem("posts", JSON.stringify(updated));
    setPosts(updated);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description || !newPost.assignedTo) return;
    const updated = [...posts, newPost];
    savePosts(updated);
    setNewPost({ title: "", description: "", assignedTo: "" });
  };

  const handleEdit = (index, updatedPost) => {
    const updated = posts.map((p, i) => (i === index ? updatedPost : p));
    savePosts(updated);
  };

  const handleDelete = (index) => {
    const updated = posts.filter((_, i) => i !== index);
    savePosts(updated);
  };

  // Show only the tasks for this user if not admin
  const visiblePosts =
    currentUser.role === "admin"
      ? posts
      : posts.filter((p) => p.assignedTo === currentUser.email);

  return (
    <div className="dashboard-container">
      <h2>
        Welcome, {currentUser.role === "admin" ? "Admin" : currentUser.name}
      </h2>

      {currentUser.role === "admin" && (
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
          />
          <select
            value={newPost.assignedTo}
            onChange={(e) =>
              setNewPost({ ...newPost, assignedTo: e.target.value })
            }
          >
            <option value="">Assign to user...</option>
            {users
              .filter((u) => u.role === "user")
              .map((u, i) => (
                <option key={i} value={u.email}>
                  {u.name} ({u.email})
                </option>
              ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
      )}

      <PostList
        posts={visiblePosts}
        role={currentUser.role}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
