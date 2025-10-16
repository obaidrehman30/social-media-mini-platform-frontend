import axios from "axios";

const API_URL = "http://localhost:5000/api/posts/create";

// 🔹 Create a New Post (with Image Upload)
export const createPost = async (userId, content, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error creating post:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Fetch All Posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching posts:", error.response?.data || error.message);
    throw error;
  }
};
