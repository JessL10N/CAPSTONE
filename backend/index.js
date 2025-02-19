import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import { router as teacherRouter } from "./routes/teacherRoutes.js";
import { router as courseRouter } from "./routes/courseRoutes.js";
import { router as testimonialRouter } from "./routes/testimonialRoutes.js"
import { router as contactRouter } from "./routes/contactRoutes.js";
import User from "./models/userModel.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/docenti", teacherRouter);
app.use("/api/corsi", courseRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/contattaci", contactRouter);
app.use("/api", uploadRoutes); // route di upload è disponibile su: POST http://localhost:3001/api/upload


// chiave segreta per JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

// API di login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Credenziali non valide" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Credenziali non valide" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token, role: user.role });
});

// API di registrazione
app.post("/api/registrati", async (req, res) => {
  const { email, password, role } = req.body;

  // Controllo se l'email è già presente nel database
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Utente già registrato con questa email." });
  }

  try {
    // Crea un nuovo utente con la password criptata
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "user", // Il ruolo può essere passato, altrimenti default a "user"
    });

    await newUser.save();

    // Genera un JWT per il nuovo utente
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: "1h" });

    // Risposta con il token
    res.status(201).json({ token, role: newUser.role });
  } catch (err) {
    res.status(500).json({ message: "Errore durante la registrazione." });
  }
});


const port = 3001;

app.listen(port, () => {
    console.log(`Server connesso a ${port}`);
  });