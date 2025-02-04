import Course from "../models/courseModel.js";
import Teacher from "../models/teacherModel.js";
import mongoose from "mongoose";

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
    const { teacher, ...rest } = req.body;

    // Cerca l'insegnante per nome o ID
    let teacherDoc;
    
    if (mongoose.Types.ObjectId.isValid(teacher)) {
      // Se è un ObjectId valido, cerca per ID
      teacherDoc = await Teacher.findById(teacher);
    } else {
      // Se è una stringa, cerca per nome
      teacherDoc = await Teacher.findOne({ name: teacher });
    }

    if (!teacherDoc) {
      return res.status(404).json({ message: "Insegnante non trovato" });
    }

    // Crea il nuovo corso con l'ObjectId corretto
    const newCourse = new Course({
      ...rest,
      teacher: teacherDoc._id, // Usa il vero ObjectId
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

const modifyCourse = async (req, res, next) => {
  try {
    const { teacher, ...rest } = req.body;
    let teacherId;

    if (mongoose.Types.ObjectId.isValid(teacher)) {
      // Se teacher è un ObjectId valido, usalo direttamente
      teacherId = teacher;
    } else {
      // Se teacher è un nome, cerca l'insegnante nel database
      const teacherDoc = await Teacher.findOne({ name: teacher });
      if (!teacherDoc) {
        return res.status(404).json({ message: "Insegnante non trovato" });
      }
      teacherId = teacherDoc._id;
    }

    // Aggiorna il corso con l'ID corretto dell'insegnante
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { ...rest, teacher: teacherId },
      { new: true, runValidators: true } // Applica le validazioni
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Corso non trovato" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};


// const modifyCourse = async (req, res, next) => {
//   try {
//     const { teacher, ...rest } = req.body;

//     const updatedCourse = await Course.findByIdAndUpdate(
//       req.params.id,
//       { ...rest, teacher: new mongoose.Types.ObjectId(teacher) }, // Assicura che teacher sia un ObjectId
//       { new: true }
//     );

//     res.status(200).json(updatedCourse);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     next(error);
//   }
// };
//   try {
//     const id = req.params.id;
//     const updatedCourse = await Course.findByIdAndUpdate(id, req.body);
//     res.json("Corso aggiornato");
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

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
