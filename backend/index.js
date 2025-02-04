import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import { router as teacherRouter } from "./routes/teacherRoutes.js";
import { router as courseRouter } from "./routes/courseRoutes.js";
import { router as testimonialRouter } from "./routes/testimonialRoutes.js"
import User from "./models/userModel.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/docenti", teacherRouter);
app.use("/api/corsi", courseRouter);
app.use("/api/testimonials", testimonialRouter);

// chiave segreta per JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

// **API di login**
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

// **Middleware per proteggere le route**
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token mancante" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token non valido" });
  }
};

// **Esempio di route protetta**
/*
app.get("/api/corsi", authenticateJWT, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accesso negato" });
  }
  res.json({ message: "Benvenuto Admin" });
});*/

//API di registrazione
app.post("/api/register", async (req, res) => {
  const { email, password, role } = req.body;

  // Controlla se l'email è già presente nel database
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

    // Salva il nuovo utente
    await newUser.save();

    // Genera un JWT per il nuovo utente
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: "1h" });

    // Rispondi con il token
    res.status(201).json({ token, role: newUser.role });
  } catch (err) {
    res.status(500).json({ message: "Errore durante la registrazione." });
  }
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server connesso a ${port}`);
  });