import { useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://social-media-mini-platform-backend.onrender.com/api/auth/register", user);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Container maxWidth="xs">
          <Box
            sx={{
              p: 4,
              borderRadius: '12px',
              backgroundColor: 'rgba(18, 18, 18, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 1,
                background: 'linear-gradient(90deg, #90caf9, #f48fb1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Create Account
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, color: "text.secondary" }}>
              Sign up to join the community
            </Typography>
            
            <motion.form onSubmit={handleSignup}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                InputLabelProps={{ 
                  sx: { 
                    color: 'text.secondary',
                    '&.Mui-focused': {
                      color: '#90caf9',
                    }
                  } 
                }}
                InputProps={{
                  sx: {
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#90caf9',
                    },
                  },
                }}
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                variant="outlined"
                InputLabelProps={{ 
                  sx: { 
                    color: 'text.secondary',
                    '&.Mui-focused': {
                      color: '#90caf9',
                    }
                  } 
                }}
                InputProps={{
                  sx: {
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#90caf9',
                    },
                  },
                }}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                InputLabelProps={{ 
                  sx: { 
                    color: 'text.secondary',
                    '&.Mui-focused': {
                      color: '#90caf9',
                    }
                  } 
                }}
                InputProps={{
                  sx: {
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#90caf9',
                    },
                  },
                }}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />

              {error && (
                <Typography 
                  variant="body2" 
                  color="error" 
                  sx={{ mt: 2 }}
                >
                  {error}
                </Typography>
              )}

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    background: 'linear-gradient(90deg, #90caf9, #f48fb1)',
                    color: '#121212',
                    borderRadius: '8px',
                    '&:hover': {
                      opacity: 0.9,
                    },
                    '&.Mui-disabled': {
                      background: 'rgba(255, 255, 255, 0.12)',
                      color: 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                </Button>
              </motion.div>

              <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                Already have an account?{" "}
                <Typography
                  component="span"
                  sx={{
                    color: "#90caf9",
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Typography>
              </Typography>
            </motion.form>
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
};

export default Signup;