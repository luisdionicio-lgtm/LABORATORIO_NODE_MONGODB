import express from "express";
import postService from "../services/postService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const featuredPost = await postService.getFeaturedPost();
    res.render("home", { featuredPost });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});

export default router;
