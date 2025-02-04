import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    image: String,
    name: String,
    surname: String,
    testimonial: String
});

const Testimonial = mongoose.model("testimonials", testimonialSchema);

export default Testimonial;