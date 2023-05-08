import express from "express";
const router = express.Router()
import controller from "../controllers/index.controller.js"

router.get('/:id', controller.index)

export default router