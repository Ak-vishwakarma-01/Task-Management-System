import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }

  // State to hold identifier (email or username) and password
  const [Data, setData] = useState({ identifier: "", password: "" });
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.identifier === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://tms-bakcen-api.onrender.com/api/v1/log-in",
          Data
        );
        setData({ identifier: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="sm:w-2/6 md:w-2/6 lg:w-2/6 w-4/6 p-4 bg-blue-900 rounded flex flex-col items-center">
        <div className="text-2xl">Log In</div>
        {/* Single input for either username or email */}
        <input
          type="text"
          placeholder="Email or Username"
          name="identifier"
          value={Data.identifier}
          onChange={change}
          className="bg-blue-700 px-3 py-2 rounded my-3 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={Data.password}
          onChange={change}
          className="bg-blue-700 px-3 py-2 rounded my-3 w-full"
        />
        <div className="w-full flex-row items-center">
          <button
            className="bg-blue-600 p-2 rounded my-3"
            onClick={submit}
          >
            Log In
          </button>
          <Link
            to="/signup"
            className="text-xs text-blue-400 hover:text-blue-200 m-2"
          >
            Not having an account? Sign up here
          </Link>
          <Link to="/forgot">
            <button className="text-xs text-blue-400 hover:text-blue-200">
              Password Forgot
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
