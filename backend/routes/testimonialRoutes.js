import express from 'express';
import { getAllTestimonials } from '../controllers/testimonialQueries.js';


const router = express.Router();

router.get("/", getAllTestimonials);

export {router};