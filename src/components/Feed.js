import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Post from "./Post"; 

const Feed = () => {
  const [postsList, setPostsList] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.get("https://social-media-mini-platform-backend.onrender.com/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setPostsList(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      width: "100vw",
      minHeight: "100vh",
      padding: { xs: '16px', md: '24px' }
    }}>
      <Box sx={{ 
        width: "100%", 
        maxWidth: "800px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        gap: 3
      }}>
        {error && (
          <Typography color="error" sx={{ 
            p: 2,
            background: 'rgba(244,67,54,0.1)',
            borderRadius: '8px',
            width: '100%',
            textAlign: 'center'
          }}>
            {error}
          </Typography>
        )}
        {postsList.length > 0 ? (
          postsList.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <Typography color="text.secondary" sx={{ mt: 4 }}>
            No posts available. Be the first to post something!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Feed;