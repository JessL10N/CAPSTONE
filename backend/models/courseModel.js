import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    image: String,
    title: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
    level: String,
    form: String,
    description: String
});

const Course = mongoose.model("courses", courseSchema);

export default Course;