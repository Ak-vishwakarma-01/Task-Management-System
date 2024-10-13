import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4">
      <div className="w-2/6 lg:w-1/6 md:w-2/6 sm:w-2/6 border rounded-xl  p-4 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="w-4/6 lg:w-5/6 md:w-4/6 sm:w-4/6 border rounded-xl  p-4">
      <Outlet/>
      </div>
    </div>
  );
};

export default Home;
