import React, { useEffect, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxLapTimer } from "react-icons/rx";
import { Link ,useNavigate } from "react-router-dom";
import Alltask from "../../pages/Alltask";
import Completed from "../../pages/Completed";
import Incompleted from "../../pages/Incompleted";
import { useDispatch } from "react-redux";
import { authActions  } from "../../store/auth";
import axios from 'axios';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = [
    { title: "All Tasks", 
      icons:<FaListAlt />,
      link: "/",
    },
    { title: "Completed tasks",
      icons:<IoMdCheckmarkCircleOutline />,
      link: "/completed",
    },
    { title: "Incompleted tasks",
      icons: <RxLapTimer />,
      link: "/incompletetasks",
    },
  ];

  const [Data,setData] = useState();

  const logout = async()=>{
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch(authActions.logout());
    navigate("/login")
  }
 
  const headers = {
    id:localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")} `,
  };

  useEffect(() => {
    const fetch = async()=>{
      const response =  await axios.get("https://tms-bakcen-api.onrender.com/api/v2/get-all-tasks",{
        headers,
      });
      setData(response.data.data);
    };
    fetch();
  }, []);
  

  return (
    <>
      {Data && <div>
        <h2 className="text-xl font-semibold">{Data.username}</h2>
        <h4 className="my-1 text-gray-400">{Data.email}</h4>
        <hr />
      </div>}
        <div>
        {data.map((items, index) => (
            <Link 
            to={items.link} 
            key={index} 
            className="my-2 flex items-center gap-2 hover:bg-slate-600 p-2 rounded transition-all duration-300"> 
                {items.icons }{items.title}
            </Link> 
          ))}
        </div>
        <div>
          <button className="bg-zinc-500 w-full p-1 rounded " onClick={logout}>Log Out</button>
        </div>
      </>
  );
};

export default Sidebar;
