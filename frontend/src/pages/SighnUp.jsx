import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useSelector } from "react-redux";
const SighnUp = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn===true){
    navigate("/");
  }
  const [Data, setData] = useState({username:"",email:"",password:""}); 
  const change = (e)=>{
    const {name,value} = e.target;
    setData({...Data,[name]:value});
  }

  const submit = async()=>{
    try{
      if(Data.username === "" || Data.email=== "" || Data.password === ""){
        alert("All fields are required")
      }else{
        const response = await axios.post("http://localhost:1000/api/v1/sign-in",Data);
        setData({username:"",email:"",password:""})
        alert(response.data.message);
        navigate("/login");
      }
    }catch(err){
      alert(err.response.data.message);
    }
  }
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="sm:w-2/6 md:w-2/6 lg:w-2/6 w-4/6 p-4 bg-blue-900 rounded flex flex-col items-center">
        <div className="text-2xl">SignUp</div>
        <input
        type="username" 
        placeholder="username" 
        name="username"
        value={Data.username}
        onChange={change}
        className="bg-blue-700 px-3 py-2 rounded my-3 w-full" />
        <input
        type="email" 
        placeholder="xyz@example.com" 
        name="email"
        value={Data.email}
        onChange={change}
        className="bg-blue-700 px-3 py-2 rounded my-3 w-full" />
      <input
        type="password" 
        placeholder="password" 
        name="password"
        value={Data.password}
        onChange={change}
        className="bg-blue-700 px-3 py-2 rounded my-3 w-full" />
      <div className='w-full flex items-center justify-between'>
            <button className="bg-blue-600 p-2 rounded my-3 " onClick={submit}>SignUp</button>
            <Link to="/login" className="text-xs text-blue-400 hover:text-blue-200">Alrady registered? Login here</Link>
      </div>
      </div>
    </div>
  );
};

export default SighnUp;
