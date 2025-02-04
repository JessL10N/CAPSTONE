import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourseById, modifyCourse } from '../controllers/courseQueries.js';


const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/new", createCourse);
router.put("/:id", modifyCourse);
router.delete("/:id", deleteCourse);

export { router };
