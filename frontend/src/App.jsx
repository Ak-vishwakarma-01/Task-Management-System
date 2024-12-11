import React, { useEffect } from 'react';
import Home from './pages/Home';
import { Routes, Route, Router, useNavigate } from "react-router-dom";
import Alltask from './pages/Alltask';
import Completed from './pages/Completed';
import Incompleted from './pages/Incompleted';
import SighnUp from './pages/SighnUp';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }else if(isLoggedIn===false){
      navigate("/signup");
    }
  }, []);
  
  return (
    <div className="bg-blue-950 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltask />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/incompletetasks" element={<Incompleted />} />
        </Route>
          <Route path="/signup" element={<SighnUp />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgot" element={<ForgotPassword/>}/>
      </Routes>
    </div>
  )
}

export default App;
