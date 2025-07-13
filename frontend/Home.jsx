import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3001/get");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id)); // remove from UI
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Error deleting blog");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={4} key={blog._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography>{blog.content}</Typography>
              </CardContent>
              <Box p={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(blog._id)}
                >
                  DELETE
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
