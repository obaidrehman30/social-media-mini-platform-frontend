import React from "react";
import { Box } from "@mui/material";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center",
      background: 'linear-gradient(to bottom, #0a0a0a, #121212)',
      minHeight: 'calc(100vh - 64px)',
      paddingTop: { xs: '16px', md: '24px' }
    }}>
      <Feed />
    </Box>
  );
};

export default Home;