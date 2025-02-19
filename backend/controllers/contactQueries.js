import Contact from "../models/contactModel.js";

const postContact = async (req, res) => {
    try{
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Tutti i campi sono obbligatori." });
          }
      
          // Nuovo documento Contact
          const newContact = new Contact({ name, email, subject, message });
          await newContact.save();
      
          // Messaggio di successo
          res.status(201).json({ message: "Messaggio inviato con successo!" });
        } catch (error) {
          console.error("Errore durante l'invio del messaggio:", error);
          res.status(500).json({ error: "Errore del server." });
        }
      };

export { postContact }