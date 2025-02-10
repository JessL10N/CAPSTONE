import express from "express";
import { postContact } from "../controllers/contactQueries.js";

const router = express.Router();

router.post("/", postContact);

export { router };
