import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);

  const fetchLikes = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://social-media-mini-platform-backend.onrender.com/api/likes/${post.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLikes(response.data.likes.length);
      setUserLiked(response.data.currentUserLiked);
    } catch (error) {
      console.error("Error fetching likes:", error);
    } finally {
      setLoading(false);
    }
  }, [post.id]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://social-media-mini-platform-backend.onrender.com/api/comments/${post.id}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [post.id]);

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [post.id, fetchLikes, fetchComments]);

  const handleLike = async () => {
    if (!userId) return;
    
    const wasLiked = userLiked;
    setUserLiked(!wasLiked);
    setLikes(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://social-media-mini-platform-backend.onrender.com/api/likes/${post.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      setUserLiked(wasLiked);
      setLikes(prev => wasLiked ? prev + 1 : prev - 1);
      console.error("Error toggling like:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !userId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://social-media-mini-platform-backend.onrender.com/api/comments/create",
        { postId: post.id, commentText: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Card sx={{ 
      marginBottom: 3, 
      width: "90vw", 
      maxWidth: "800px",
      background: 'rgba(30, 30, 30, 0.5)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Avatar sx={{ 
          mr: 1.5,
          width: 40,
          height: 40,
          bgcolor: 'primary.main',
          color: 'background.paper'
        }}>
          {post.username[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography fontWeight="600">{post.username}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(post.created_at).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {post.media_url && (
        <CardMedia
          component="img"
          image={post.media_url}
          alt="Post"
          sx={{ 
            width: "100%", 
            maxHeight: 500, 
            objectFit: "cover",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        />
      )}
      
      <CardContent>
        <Typography sx={{ mb: 2 }}>{post.content}</Typography>
        
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          mt: 2, 
          gap: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          pt: 2
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton 
              onClick={handleLike} 
              disabled={loading}
              sx={{ 
                color: userLiked ? "error.main" : "inherit",
                '&:hover': {
                  color: 'error.main'
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : userLiked ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography>{likes}</Typography>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CommentIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography>{comments.length}</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
              },
            }}
          />
          <Button 
            onClick={handleAddComment}
            variant="contained"
            size="small"
            sx={{ 
              mt: 1.5,
              borderRadius: '8px',
              px: 2,
              py: 0.5,
              background: 'linear-gradient(90deg, #90caf9, #f48fb1)',
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            Post Comment
          </Button>
        </Box>

        <Box sx={{ 
          mt: 2, 
          maxHeight: 200, 
          overflow: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '3px'
          }
        }}>
          {comments.map(comment => (
            <Box key={comment.id} sx={{ 
              display: 'flex', 
              mb: 1.5, 
              p: 1.5,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              transition: 'background 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.08)'
              }
            }}>
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                mr: 1.5,
                bgcolor: 'secondary.main',
                fontSize: '0.875rem'
              }}>
                {comment.username[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight="600">
                  {comment.username}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>{comment.content}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  {new Date(comment.created_at).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Post;