import express from "express";
import { getImpacts } from "./controllers/impacts.js"

const router = express.Router();

router.get("/impacts", getImpacts);

export default router;