import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/add", formData)
      .then(() => {
        alert("Blog added successfully!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Add Blog</Typography>
      <TextField
        label="Title"
        name="title"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Content"
        name="content"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Image URL"
        name="img_url"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default Add;
