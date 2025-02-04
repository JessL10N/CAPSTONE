import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config';
import User from "../models/userModel.js";

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const updatePasswords = async () => {
    const users = await User.find(); // Recupera tutti gli utenti
  
    for (let user of users) {
      if (!user.password) {
        const randomPassword = Math.random().toString(36).slice(-8); // Genera una password casuale
        const hashedPassword = await bcrypt.hash(randomPassword, 10); // Cripta la password
        user.password = hashedPassword;
        await user.save();
        console.log(`Password aggiornata per ${user.email}: ${randomPassword}`);
      }
    }
  
    mongoose.disconnect();
  };
  
  updatePasswords();