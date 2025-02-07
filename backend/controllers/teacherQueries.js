import Teacher from "../models/teacherModel.js";

const getAllTeachers = async (req, res, next) => {
    try{
        const allTeachers = await Teacher.find({});
        res.json(allTeachers);
        return allTeachers
  }catch(error){
    console.log("Errore durante il recupero dei corsi:", error);
    next(error);
  }    
};

const getTeacherById = async (req, res, next) => {
  try{
      const id = req.params.id;
      const teacher = await Teacher.findById({_id: id});
      if(!teacher){
          //throw new Error("Autore non trovato")
          res.sendStatus(404).json("Insegnante non trovato");
      } else{
      res.json(teacher);
      }
  } catch(error){
      console.log(error);
      next(error);
  }
};

const createTeacher = async (req, res, next) => {
  try{
      const newTeacher = await Teacher.create(req.body);
      res.status(201).json("Nuovo insegnante aggiunto con successo")
  } catch(error){
      console.log(error)
      next(error)
  }
};

const modifyTeacher = async (req, res, next) => {
  try{
      const id = req.params.id;
      const { Image, Name, Surname, Bio } = req.body;
      
    const updatedData = {
      Image,       
      Name,         
      Surname,   
      Bio,            
    };    

      const updatedTeacher = await Teacher.findByIdAndUpdate( id, updatedData, { new: true });

      res.json(updatedTeacher);
  }catch(error){
      console.log(error);
      next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
  try{
      const id = req.params.id;
      const deletedTeacher = await Teacher.findByIdAndDelete(id);
      res.json("Insegnante cancellato");
  }catch(error){
      console.log(error);
      next(error);
  }
}

export { getAllTeachers, createTeacher, modifyTeacher, deleteTeacher, getTeacherById };