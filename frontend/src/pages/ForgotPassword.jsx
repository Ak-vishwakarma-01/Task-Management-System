import React,{useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch ,useSelector } from 'react-redux';
const Login = () => {
    const navigate = useNavigate();
    
    
    const [Data, setData] = useState({email:"",password:""}); 
    const dispatch = useDispatch();

  const change = (e)=>{
    const {name,value} = e.target;
    setData({...Data,[name]:value});
  }

  const submit = async()=>{
    try{
      if( Data.email=== "" ){
        alert("All fields are required")
      }else{
        const response = await axios.post("https://tms-bakcen-api.onrender.com/api/v1/log-in",Data);
        setData({username:"",password:""})

    }
    }catch(err){
      alert(err.response.data.message);
    }
  }
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="sm:w-2/6 md:w-2/6 lg:w-2/6 w-4/6 p-4 bg-blue-900 rounded flex flex-col items-center">
        <div className="text-2xl">LogIn</div>
        <input
        type="email" 
        placeholder="email" 
        name="email"
        value = {Data.email}
        onChange={change}
        className="bg-blue-700 px-3 py-2 rounded my-3 w-full" />
        <input
        type="password" 
        placeholder="password" 
        name="password"
        value = {Data.password}
        onChange={change}
        className="bg-blue-700 px-3 py-2 rounded my-3 w-full" />
        <div className='w-full flex-row items-center'>
            <button className="bg-blue-600 p-2 rounded my-3" onClick={submit}>Update Password</button>
            {/* <Link to="/login"><button className='text-xs text-blue-400 hover:text-blue-200 m-2' >Log In Page</button></Link> */}
        </div>
      </div>
    </div>
  )
}

export default Login