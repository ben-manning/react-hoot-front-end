import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import HootList from './components/HootList/HootList';
import * as authService from '../src/services/authService';
import * as hootService from '../src/services/hootService';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData.hoots);
    };
    if (user) fetchAllHoots();
  }, [user]);


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        { user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path='/hoots' element={<HootList hoots={hoots} />} />
          </>
          
        ) : (
          <Route path="/" element={<Landing />} />
        )}

        <Route path='/signup' element={<SignupForm setUser={setUser} />} />
        <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
