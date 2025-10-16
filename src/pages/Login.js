import { useState, useContext, useEffect } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box,
  CircularProgress // Added this import
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://social-media-mini-platform-backend.onrender.com/api/auth/login", user);
      const token = response.data.token;
      login(token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
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
        transition={{ duration: 0.6 }}
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
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
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
                Welcome Back
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3, color: "text.secondary" }}>
                Login to access your account
              </Typography>
            </motion.div>

            <motion.form 
              onSubmit={handleLogin} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.6 }}
            >
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
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
              </motion.div>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "text.secondary",
                  cursor: "pointer",
                  "&:hover": { color: "text.primary" },
                }}
                component={motion.p}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Typography>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                  Don't have an account?{" "}
                  <Typography
                    component="span"
                    sx={{
                      color: "#90caf9",
                      fontWeight: "bold",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Typography>
                </Typography>
              </motion.div>
            </motion.form>
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
};

export default Login;