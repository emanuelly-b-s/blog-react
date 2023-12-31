import { Route, Routes } from 'react-router-dom';
// import HomePage from './pages/home';
import AddPostPage from './pages/addPost';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NavBar from './pages/navbar';
import { AlertProvider } from './context/alert';
import HomePage from './pages/home';
import ProtectedRoute from './pages/protectedRoute';
import { AccessDenied } from './pages/accessDenied';
import { LanguageProvider } from './context/language';


function App() {
  return (
    <>
    <LanguageProvider>
      <AlertProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />

          <Route path='/home' element={<HomePage />} />
          <Route path='/add' element={<AddPostPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/main' element={
            <ProtectedRoute
              errorPage={<AccessDenied />}
              targetPage={<NavBar />}
            />
          }>
          </Route>
        </Routes>
      </AlertProvider>
      </LanguageProvider>
    </>
  );
}
export default App;