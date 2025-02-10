import express from "express";
import upload from "../config/multerConfig.js"
import cloudinary from "../config/cloudinaryConfig.js";

const router = express.Router();

// La route per caricare un'immagine. Il campo del form deve avere name="image"
router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Nessun file inviato." });
    }
  
    // Usa upload_stream per caricare l'immagine direttamente da un buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "nome_cartella_opzionale" }, // Opzionale: specifica una cartella su Cloudinary
      (error, result) => {
        if (error) {
          console.error("Errore durante l'upload su Cloudinary:", error);
          return res.status(500).json({ error: "Errore durante l'upload" });
        }
        // Restituisci l'URL dell'immagine caricata
        res.json({ url: result.secure_url });
      }
    );
  
    // Invia il buffer del file al cloudinary uploader
    uploadStream.end(req.file.buffer);
  });
  
  export default router;