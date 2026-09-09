import express from "express";
import studentsFileController from "../controllers/studentsFileController.js";

const router = express.Router();

router.get("/", studentsFileController.getStudentsFromFile);
router.get("/query", studentsFileController.getStudentByQuery);
router.get("/:id", studentsFileController.getStudentByParam);

export default router;