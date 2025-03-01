import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String,
});

const User = mongoose.model("users", userSchema);

export default User;