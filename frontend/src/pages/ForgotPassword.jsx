import React,{useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch ,useSelector } from 'react-redux';
const ForgotPassword = () => {
    const navigate = useNavigate();
    
    const [Data, setData] = useState({email:"",password:""}); 
    const [otp, setOtp] = useState({otp:''})
    const dispatch = useDispatch();
    const [otpPass, setOtpPass] = useState({sendOtp:true, verifyOtp: false, updatePassword: false});

  const change = (e)=>{
    const {name,value} = e.target;
    setData({...Data,[name]:value});
    setOtp({...otp,[name]:value})
  }
  
  const sendOtpFunc = async() =>{
      const response = await axios.post('https://tms-bakcen-api.onrender.com/api/v1/check-email',Data.email);
      if(response.status==200){
          alert("email not found");
      }else{

      } 
    }

  const verifyOtpFunc = async() =>{

  }

  const updatePassFunc = async() =>{
    try{
        if( Data.email=== "" || Data.password === ""){
          alert("All fields are required")
        }else{
          const response = await axios.post("https://tms-bakcen-api.onrender.com/api/v1/update-password",Data);
          setData({email:"",password:""});
          if(response.status==200){
              alert("password updated successfully");
              navigate('/login');;
          }
      }
      }catch(err){
        alert(err.response.data.message);
      }
  }

  const submit = async()=>{
    if(sendOtp){
        sendOtpFunc;
    }
    else if(verifyOtp){
        verifyOtpFunc;
    }else {
        updatePassFunc;
    }   
  }

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="sm:w-2/6 md:w-2/6 lg:w-2/6 w-4/6 p-4 bg-blue-900 rounded flex flex-col items-center">
        <div className="text-2xl">Update Password</div>
        <input
        type="email" 
        placeholder="email" 
        name="email"
        value = {Data.email}
        onChange={change}
        className="bg-blue-700 px-3 py-2 rounded my-3 w-full" />
        {otpPass.verifyOtp===false?"":<input
        type="otp" 
        placeholder="Enter otp" 
        name="otp"
        value = {otp.otp}
        onChange={change}
        className="bg-blue-700 px-3 py-2 rounded my-3 w-full" />}
        {otpPass.updatePassword===false?"":<input
        type="password" 
        placeholder="password" 
        name="password"
        value = {Data.password}
        onChange={change}
        className="bg-blue-700 px-3 py-2 rounded my-3 w-full" /> }
        <div className='w-full flex-row items-center'>
            <button className="bg-blue-600 p-2 rounded my-3" onClick={submit}>
            {otpPass.sendOtp===true ? "Send Otp"
            :otpPass.verifyOtp===true ? 'Verify Otp'
            : 'updae password'  
            }
            </button>
            {/* <Link to="/login"><button className='text-xs text-blue-400 hover:text-blue-200 m-2' >Log In Page</button></Link> */}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword