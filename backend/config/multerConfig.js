import multer from "multer";

const storage = multer.memoryStorage(); // salva il file in memoria (RAM)
const upload = multer({ storage });

export default upload;