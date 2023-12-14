import express from "express";
import {
  getTopics,
  getSectors,
  getTitles,
} from "./controllers/client.js";

const router = express.Router();

router.get("/topics", getTopics);
router.get("/sectors", getSectors);
router.get("/titles", getTitles);

export default router;