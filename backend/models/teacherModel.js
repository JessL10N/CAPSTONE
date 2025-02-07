import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    Image: String,
    Name: String,
    Surname: String,
    Bio: String,
});

const Teacher = mongoose.model("teachers", teacherSchema);

export default Teacher;