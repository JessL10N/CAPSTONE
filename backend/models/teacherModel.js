import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    image: String,
    name: String,
    surname: String,
    bio: String,
});

const Teacher = mongoose.model("teachers", teacherSchema);

export default Teacher;