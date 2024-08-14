import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsByCategory,
  getSinglePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../utils/protectRoute.js";

const postRouter = Router();

postRouter.get("/all", getAllPosts);
postRouter.post("/create", protectRoute, createPost);
postRouter.get("/:id", getSinglePost);
postRouter.get("/related/:category", getPostsByCategory);
postRouter.delete("/:id", protectRoute, deletePost);

export default postRouter;
