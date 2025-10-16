import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar 
      position="sticky"
      sx={{ 
        background: 'rgba(18, 18, 18, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: 'none',
        padding: '4px 0',
        top: 0, 
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between", // Changed to space-between
        alignItems: "center",
        minHeight: '64px !important',
        px: 3
      }}>
        {/* Logo container - unchanged from original */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          marginLeft: { xs: 0, sm: 2 } // Same responsive left margin
        }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ height: "32px", filter: 'brightness(0) invert(1)' }} 
          />
          {/* Empty Box to maintain spacing (invisible on mobile) */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
        </Box>
        
        {/* SocialApp text moved to far right */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(90deg, #90caf9, #f48fb1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: { xs: 'none', sm: 'block' }, // Hidden on mobile
            marginRight: { sm: 2 } // Optional: Add some right margin if needed
          }}
        >
          SocialApp
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;