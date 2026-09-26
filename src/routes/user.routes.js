import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.index);
router.post("/", userController.create);
router.get("/:id/edit", userController.showEdit);
router.post("/:id/edit", userController.update);

export default router;
