import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Typography,
  CircularProgress,
  Container,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Button,
  ButtonGroup,
} from "@mui/material";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { userId: profileUserId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const { userId: currentUserId } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://social-media-mini-platform-backend.onrender.com/api/users/${profileUserId}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setProfileData(data);

        if (currentUserId && currentUserId !== profileUserId) {
          const followCheck = await fetch(
            `https://social-media-mini-platform-backend.onrender.com/api/follows/check?followerId=${currentUserId}&followingId=${profileUserId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const followData = await followCheck.json();
          setIsFollowing(followData.isFollowing);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileUserId, currentUserId]);

  const handleFollow = async () => {
    if (!currentUserId) return;
    setFollowLoading(true);

    try {
      const token = localStorage.getItem("token");
      const url = `https://social-media-mini-platform-backend.onrender.com/api/follows/${
        isFollowing ? "unfollow" : "follow"
      }`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          followerId: currentUserId,
          followingId: profileUserId,
        }),
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);
        setProfileData((prev) => ({
          ...prev,
          stats: {
            ...prev.stats,
            followersCount: isFollowing
              ? prev.stats.followersCount - 1
              : prev.stats.followersCount + 1,
          },
        }));
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profileData) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <Typography variant="h6">Profile not found.</Typography>
      </Box>
    );
  }

  const { user, stats, posts } = profileData;

  const imagePosts = posts.filter((post) => post.media_url);
  const textPosts = posts.filter((post) => !post.media_url);

  const renderPostCard = (post) => (
    <Card
      key={post.id}
      sx={{
        width: '100%',
        backgroundColor: 'rgba(30, 30, 30, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
        },
        mb: 3
      }}
    >
      {post.media_url && (
        <CardMedia
          component="img"
          image={post.media_url}
          alt="Post media"
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
        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            whiteSpace: "pre-line",
            wordBreak: "break-word",
          }}
        >
          {post.content || "No content"}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      backgroundColor: '#121212', 
      minHeight: '100vh', 
      py: 6,
      color: 'white'
    }}>
      <Container maxWidth="md">
        <Box
          sx={{
            p: 5,
            borderRadius: '12px',
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)',
            mb: 4
          }}
        >
          <Avatar
            src={user.profile_pic || ""}
            sx={{
              width: 110,
              height: 110,
              margin: '0 auto',
              fontSize: 42,
              backgroundColor: '#90caf9',
              color: '#121212',
              mb: 2,
            }}
          >
            {user.username?.charAt(0)?.toUpperCase() || "?"}
          </Avatar>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              background: 'linear-gradient(90deg, #90caf9, #f48fb1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {user.username}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email}
          </Typography>

          {currentUserId && currentUserId !== user.id && profileData && (
            <Box mt={2}>
              <Button
                variant={isFollowing ? "outlined" : "contained"}
                color={isFollowing ? "secondary" : "primary"}
                onClick={handleFollow}
                disabled={followLoading}
                sx={{
                  borderRadius: '8px',
                  px: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&.MuiButton-contained': {
                    background: 'linear-gradient(90deg, #90caf9, #f48fb1)',
                  }
                }}
              >
                {followLoading ? (
                  <CircularProgress size={24} />
                ) : isFollowing ? (
                  "Following"
                ) : (
                  "Follow"
                )}
              </Button>
            </Box>
          )}

          <Divider sx={{ 
            my: 3, 
            backgroundColor: 'rgba(255, 255, 255, 0.08)' 
          }} />

          <Box display="flex" justifyContent="center" gap={6}>
            {[
              { value: stats.postCount, label: 'Posts' },
              { value: stats.followersCount, label: 'Followers' },
              { value: stats.followingCount, label: 'Following' }
            ].map((stat, index) => (
              <Box key={index} textAlign="center">
                <Typography variant="h6" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box textAlign="center" mt={4}>
          <ButtonGroup variant="outlined">
            <Button
              onClick={() => setActiveTab("posts")}
              sx={{
                color: activeTab === "posts" ? 'white' : 'text.secondary',
                backgroundColor: activeTab === "posts" ? 'rgba(144, 202, 249, 0.2)' : 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.23)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)'
                }
              }}
            >
              Posts
            </Button>
            <Button
              onClick={() => setActiveTab("threads")}
              sx={{
                color: activeTab === "threads" ? 'white' : 'text.secondary',
                backgroundColor: activeTab === "threads" ? 'rgba(244, 143, 177, 0.2)' : 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.23)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)'
                }
              }}
            >
              Threads
            </Button>
          </ButtonGroup>
        </Box>

        <Box mt={5}>
          {activeTab === "posts" ? (
            imagePosts.length > 0 ? (
              <Box sx={{ width: '100%' }}>
                {imagePosts.map(renderPostCard)}
              </Box>
            ) : (
              <Typography 
                textAlign="center" 
                color="text.secondary" 
                mt={3}
                sx={{ opacity: 0.7 }}
              >
                No image posts yet.
              </Typography>
            )
          ) : (
            textPosts.length > 0 ? (
              <Box sx={{ width: '100%' }}>
                {textPosts.map(renderPostCard)}
              </Box>
            ) : (
              <Typography 
                textAlign="center" 
                color="text.secondary" 
                mt={3}
                sx={{ opacity: 0.7 }}
              >
                No threads yet.
              </Typography>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;