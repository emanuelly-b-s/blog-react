import { Route, Routes } from 'react-router-dom';
// import HomePage from './pages/home';
// import AddPostPage from './pages/addPost';
// import LoginPage from './pages/login';
// import RegisterPage from './pages/register';
import NavBar from './pages/navbar';
import { AlertProvider } from './context/alert';
import { Nav } from 'react-bootstrap';
// import './App.css';

function App() {
  return (
    <>
      <AlertProvider>
        <Routes>
          <Route path='/' element={<NavBar />} />
          {/* <Route path='/home' element={<HomePage />} />
          <Route path='/add' element={<AddPostPage />} />
          <Route path='/register' element={<RegisterPage />} /> */}
        </Routes>
      </AlertProvider>
    </>
  );
}
export default App;