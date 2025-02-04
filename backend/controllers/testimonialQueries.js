import Testimonial from "../models/testimonialModel.js";

const getAllTestimonials = async (req, res, next) => {
    try{
        const allTestimonials = await Testimonial.find({});
        res.json(allTestimonials);
        return allTestimonials
  }catch(error){
    console.log("Errore durante il recupero dei testimonial:", error);
    next(error);
  }    
};

export { getAllTestimonials }