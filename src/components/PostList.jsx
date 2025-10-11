import React, { useState } from "react";
import "../styles/PostList.css";

const PostList = ({ posts, role, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editPost, setEditPost] = useState({ title: "", description: "" });

  const handleSave = (index) => {
    onEdit(index, editPost);
    setEditIndex(null);
  };

  return (
    <div className="postlist-container">
      <h3>All Posts</h3>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="post-item">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) =>
                    setEditPost({ ...editPost, title: e.target.value })
                  }
                />
                <textarea
                  value={editPost.description}
                  onChange={(e) =>
                    setEditPost({ ...editPost, description: e.target.value })
                  }
                />
                <button onClick={() => handleSave(index)}>Save</button>
              </>
            ) : (
              <>
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                {role === "admin" && (
                  <div className="btn-group">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditIndex(index);
                        setEditPost(post);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
