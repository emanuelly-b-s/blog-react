import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import AddPostPage from './pages/addPost';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { AlertProvider } from './context/alert';
// import './App.css';

function App() {
  return (
    <>
      <AlertProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/add' element={<AddPostPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </AlertProvider>
    </>
  );
}
export default App;