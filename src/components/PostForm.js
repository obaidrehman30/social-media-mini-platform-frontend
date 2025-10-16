import React, { useState, useContext } from "react";
import { Box, Modal, TextField, Button, Typography, CircularProgress } from "@mui/material";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const PostForm = ({ open, onClose, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { userId } = useContext(AuthContext);
  
  console.log("User ID from AuthContext:", userId);  

  const handleSubmit = async () => {
    if (!userId) return alert("User not authenticated");
    if (!content && !image) return alert("Post cannot be empty");

    setIsLoading(true); // Start loading

    // Create FormData for sending image as a file
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    if (image) formData.append("image", image); // Append image file



    try {
      const res = await axios.post("https://social-media-mini-platform-backend.onrender.com/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Post created:", res.data);
    } catch (error) {
      console.error("❌ Error creating post:", error.response?.data || error.message);
      // Removed alert - post might still be successful
    } finally {
      // Always refresh and close regardless of try/catch result
      setIsLoading(false);
      onClose(); // Close modal
      
      // Reset form
      setContent("");
      setImage(null);
      
      // Refresh page to show new post
      window.location.reload();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Create a Post</Typography>
        
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          label="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mt: 2 }}
          disabled={isLoading} // Disable input during loading
        />
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginTop: "10px" }}
          disabled={isLoading} // Disable file input during loading
        />
        
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          sx={{ mt: 2 }}
          disabled={isLoading} // Disable button during loading
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </Box>
    </Modal>
  );
};

export default PostForm;