import express from "express";
const router = express.Router()
import controller from "../controllers/index.controller.js"

router.get('/ejemplo', controller.index)

export default router