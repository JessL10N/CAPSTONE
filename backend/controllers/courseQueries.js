import Course from "../models/courseModel.js";
import Teacher from "../models/teacherModel.js";

const getAllCourses = async (req, res, next) => {
  try {
    const allCourses = await Course.find()
      .populate({
        path: "teacher",
        model: "teachers",
      })
      .lean();
    res.json(allCourses);
  } catch (error) {
    console.log("Errore durante il recupero dei corsi:", error);
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const course = await Course.findById({ _id: id });
    if (!course) {
      //throw new Error("Autore non trovato")
      res.sendStatus(404).json("Corso non trovato");
    } else {
      res.json(course);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {

    const teacher = await Teacher.findOne({ name: req.body.teacherName });

      if (!teacher) {
          return res.status(404).json({ error: "Insegnante non trovato" });
      }

    const newCourse = await Course.create(req.body);
    res.status(201).json("Nuovo corso aggiunto con successo");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const modifyCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body);
    res.json("Corso aggiornato");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(id);
    res.json("Corso cancellato");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  getAllCourses,
  getCourseById,
  createCourse,
  modifyCourse,
  deleteCourse,
};
