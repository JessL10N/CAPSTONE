import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import Header from './components/Header.component';
import Login from './views/Login.view';
import Register from './views/Register.view';
import Home from './views/Home.view';
import Courses from './views/Courses.view';
import Footer from './components/Footer.component';
import CourseDetails from './components/CourseDetails.component';
import NewCourse from './views/NewCourse.view';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/corsi' element={<Courses />} />
        <Route path='/corsi/:id' element={<CourseDetails />} />
        <Route path='/corsi/new' element={<NewCourse />} />
        <Route path='/docenti' element={<div>Chi siamo</div>} />
        <Route path='/contattaci' element={<div>Contattaci</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/registrati' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
