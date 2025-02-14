import './index.css'
import { Route, Routes } from 'react-router';
import Header from './components/Header.component';
import Login from './views/Login.view';
import Register from './views/Register.view';
import Home from './views/Home.view';
import Courses from './views/Courses.view';
import Footer from './components/Footer.component';
import CourseDetails from './components/CourseDetails.component';
import NewCourse from './views/NewCourse.view';
import Teachers from './views/Teachers.view';
import TeacherDetails from './components/TeacherDetails.component';
import NewTeacher from './views/NewTeacher.view';
import ContactForm from './views/ContactForm.view';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/corsi' element={<Courses />} />
        <Route path='/corsi/:id' element={<CourseDetails />} />
        <Route path='/corsi/new' element={<NewCourse />} />
        <Route path='/docenti' element={<Teachers />} />
        <Route path='/docenti/:id' element={<TeacherDetails />} />
        <Route path='/docenti/new' element={<NewTeacher />} />
        <Route path='/contattaci' element={<ContactForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registrati' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
