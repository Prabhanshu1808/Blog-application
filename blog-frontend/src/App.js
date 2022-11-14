
import './App.css';
import About from './Pages/About';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Header from './components/Navbar';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './Pages/UserRoutes/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './Pages/UserRoutes/ProfileInfo';
import Service from './Pages/Service';
import PostPage from './Pages/PostPage';
import Categories from './Pages/Categories';
import UpdateBlog from './components/UpdateBlog';


function App() {
  
  return (
    
    <Router>
      <Header />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/post/:postId' element={<PostPage/>} />
        <Route path='/categories/:categoryId' element={<Categories/>} />


        <Route path='/user' element={<PrivateRoute/>}>
           <Route path='dashboard' element={<UserDashboard/>} />
           <Route path='profile' element={<ProfileInfo/>} />
           <Route path='updateBlog/:blogId' element={<UpdateBlog/>} />
        </Route>
        
        
      </Routes>
    </Router>
  );
}

export default App;
