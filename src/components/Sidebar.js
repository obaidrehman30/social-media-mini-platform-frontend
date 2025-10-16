import React, { useState, useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Modal,
  useMediaQuery,
  SwipeableDrawer
} from "@mui/material";
import { Home, Search, AccountCircle, ExitToApp, AddBox } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PostForm from "./PostForm";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
      setMobileOpen(false);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setMobileOpen(open);
  };

  const sidebarContent = (
    <>
      <List sx={{ width: "100%", flexGrow: 1 }}>
        {/* Home Button */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            onClick={() => setMobileOpen(false)}
            sx={{
              color: "white",
              "&:hover": { 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderLeft: "3px solid rgba(144, 202, 249, 0.5)"
              },
              justifyContent: isMobile || isExpanded ? "flex-start" : "center",
              padding: isMobile ? "8px 16px" : "12px 8px",
              width: "100%",
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon
              sx={{ 
                color: "white", 
                minWidth: "auto", 
                marginRight: isMobile ? "12px" : (isExpanded ? "16px" : "0"),
              }}
            >
              <Home fontSize="medium" />
            </ListItemIcon>
            {(isMobile || isExpanded) && <ListItemText primary="Home" />}
          </ListItemButton>
        </ListItem>

        {/* Search Button */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/search"
            onClick={() => setMobileOpen(false)}
            sx={{
              color: "white",
              "&:hover": { 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderLeft: "3px solid rgba(244, 143, 177, 0.5)"
              },
              justifyContent: isMobile || isExpanded ? "flex-start" : "center",
              padding: isMobile ? "8px 16px" : "12px 8px",
              width: "100%",
            }}
          >
            <ListItemIcon
              sx={{ color: "white", minWidth: "auto", marginRight: isMobile ? "12px" : (isExpanded ? "16px" : "0") }}
            >
              <Search fontSize="medium" />
            </ListItemIcon>
            {(isMobile || isExpanded) && <ListItemText primary="Search" />}
          </ListItemButton>
        </ListItem>

        {/* Profile Button */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleProfileClick}
            sx={{
              color: "white",
              "&:hover": { 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderLeft: "3px solid rgba(144, 202, 249, 0.5)"
              },
              justifyContent: isMobile || isExpanded ? "flex-start" : "center",
              padding: isMobile ? "8px 16px" : "12px 8px",
              width: "100%",
            }}
          >
            <ListItemIcon
              sx={{ color: "white", minWidth: "auto", marginRight: isMobile ? "12px" : (isExpanded ? "16px" : "0") }}
            >
              <AccountCircle fontSize="medium" />
            </ListItemIcon>
            {(isMobile || isExpanded) && <ListItemText primary="Profile" />}
          </ListItemButton>
        </ListItem>

        {/* Post Button */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setOpenPostModal(true);
              setMobileOpen(false);
            }}
            sx={{
              color: "white",
              "&:hover": { 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderLeft: "3px solid rgba(244, 143, 177, 0.5)"
              },
              justifyContent: isMobile || isExpanded ? "flex-start" : "center",
              padding: isMobile ? "8px 16px" : "12px 8px",
              width: "100%",
            }}
          >
            <ListItemIcon
              sx={{ color: "white", minWidth: "auto", marginRight: isMobile ? "12px" : (isExpanded ? "16px" : "0") }}
            >
              <AddBox fontSize="medium" />
            </ListItemIcon>
            {(isMobile || isExpanded) && <ListItemText primary="Post" />}
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.08)", 
        width: isMobile ? "calc(100% - 32px)" : isExpanded ? "80%" : "40px",
        marginLeft: isMobile ? "16px" : isExpanded ? "10%" : "10px",
        my: 1,
        alignSelf: "center",
        mx: isExpanded ? "auto" : "none"
      }} />

      <List sx={{ width: "100%", paddingBottom: isMobile ? "12px" : "20px" }}>
        {/* Logout Button */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={logout}
            sx={{
              color: "white",
              "&:hover": { 
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderLeft: "3px solid rgba(255, 82, 82, 0.5)"
              },
              justifyContent: isMobile || isExpanded ? "flex-start" : "center",
              padding: isMobile ? "8px 16px" : "12px 8px",
              width: "100%",
            }}
          >
            <ListItemIcon
              sx={{ color: "white", minWidth: "auto", marginRight: isMobile ? "12px" : (isExpanded ? "16px" : "0") }}
            >
              <ExitToApp fontSize="medium" />
            </ListItemIcon>
            {(isMobile || isExpanded) && <ListItemText primary="Logout" />}
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <>
          {/* Floating action button for mobile */}
          <Box
            sx={{
              position: 'fixed',
              right: 16,
              bottom: 16,
              zIndex: 1200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'rgba(144, 202, 249, 0.9)',
              color: '#121212',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
            }}
            onClick={toggleDrawer(true)}
          >
            <AddBox fontSize="medium" />
          </Box>

          {/* Swipeable drawer for mobile */}
          <SwipeableDrawer
            anchor="right"
            open={mobileOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            sx={{
              '& .MuiDrawer-paper': {
                width: 180,
                background: 'rgba(18, 18, 18, 0.8)',
                backdropFilter: 'blur(10px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'none',
              },
            }}
          >
            {sidebarContent}
          </SwipeableDrawer>
        </>
      ) : (
        <Box
          sx={{
            position: "fixed",
            top: "64px",
            right: 0,
            height: "calc(100vh - 64px)",
            background: 'rgba(18, 18, 18, 0.8)',
            backdropFilter: "blur(10px)",
            width: isExpanded ? "200px" : "60px",
            transition: "width 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "15px",
            borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
            zIndex: 1100,
            boxShadow: 'none',
          }}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {sidebarContent}
        </Box>
      )}

      <Modal 
        open={openPostModal} 
        onClose={() => setOpenPostModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PostForm open={openPostModal} onClose={() => setOpenPostModal(false)} />
      </Modal>
    </>
  );
};

export default Sidebar;