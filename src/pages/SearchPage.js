import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  List,
  ListItem,
  Avatar,
  Typography,
  ListItemButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://social-media-mini-platform-backend.onrender.com/api/users/search?q=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(res.data.users);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: '#121212',
      minHeight: '100vh',
      color: 'white'
    }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#90caf9',
          },
        }}
        InputProps={{
          style: {
            color: 'white',
          },
        }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ 
          backgroundColor: 'rgba(30, 30, 30, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        }}>
          {results.length > 0 ? (
            results.map((user) => (
              <ListItem 
                key={user.id} 
                disablePadding
                sx={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <ListItemButton 
                  onClick={() => handleClick(user.id)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      mr: 2,
                      bgcolor: '#90caf9',
                      color: '#121212'
                    }}
                  >
                    {user.username[0].toUpperCase()}
                  </Avatar>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      background: 'linear-gradient(90deg, #90caf9, #f48fb1)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {user.username}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                {query ? 'No users found' : 'Start typing to search for users'}
              </Typography>
            </Box>
          )}
        </List>
      )}
    </Box>
  );
};

export default SearchPage;