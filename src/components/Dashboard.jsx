import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import "../styles/Dashboard.css";

const Dashboard = ({ currentUser, handleLogout }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", description: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(saved);
  }, []);

  const savePosts = (updated) => {
    localStorage.setItem("posts", JSON.stringify(updated));
    setPosts(updated);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description) return;
    const updated = [...posts, newPost];
    savePosts(updated);
    setNewPost({ title: "", description: "" });
  };

  const handleEdit = (index, updatedPost) => {
    const updated = posts.map((p, i) => (i === index ? updatedPost : p));
    savePosts(updated);
  };

  const handleDelete = (index) => {
    const updated = posts.filter((_, i) => i !== index);
    savePosts(updated);
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {currentUser.role === "admin" ? "Admin" : "User"}</h2>

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
          <button type="submit">Add Post</button>
        </form>
      )}

      <PostList
        posts={posts}
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
