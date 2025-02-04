import express from 'express';
import { getAllTeachers, modifyTeacher, deleteTeacher, createTeacher, getTeacherById } from '../controllers/teacherQueries.js';

const router = express.Router();

router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.post("/new", createTeacher);
router.put("/:id", modifyTeacher);
router.delete("/:id", deleteTeacher);

export {router};