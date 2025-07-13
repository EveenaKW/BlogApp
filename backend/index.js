const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BlogModel = require("./model");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://Eveena:eveena@cluster0.imkjrpg.mongodb.net/EmployeeDB?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((error) => {
  console.log("❌ MongoDB connection error:", error);
});

// Routes

// Add blog
app.post("/add", async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.status(200).send("Blog added successfully");
  } catch (error) {
    res.status(500).send("Error adding blog");
  }
});

// Get blogs
app.get("/get", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send("Error fetching blogs");
  }
});

// ❗ Delete blog
app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await BlogModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Blog not found");
    res.status(200).send("Blog deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting blog");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
