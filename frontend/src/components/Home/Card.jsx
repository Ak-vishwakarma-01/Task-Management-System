import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdAddCard } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Card = ({ home, setinputdiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")} `,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setinputdiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {data &&
        data.map((items, i) => (
          <div className="flex flex-col justify-between bg-blue-900 rounded-md p-4 hover:scale-105 cursor-pointer transition-all duration-300">
            <div>
              <h1 className="text-2xl font-semibold">{items.title}</h1>
              <p className="text-gray-200 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.complete === false
                    ? "bg-red-400 text-sm"
                    : "bg-green-600"
                } 
              p-2 rounded mr-2`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "InComplete"}
              </button>
              <div className=" text-white w-3/6 flex justify-around">
                <button
                  className="ml-3 text-xl"
                  onClick={() =>
                    handleUpdate(items._id, items.title, items.desc)
                  }
                >
                  <FaEdit />{" "}
                </button>
                <button 
                className="text-xl"
                onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}

      {home && (
        <button
          className="flex flex-col justify-center items-center bg-blue-900 text-gray-300 rounded-md p-4 hover:scale-105 cursor-pointer transition-all duration-300"
          onClick={() => setinputdiv("fised")}
        >
          <MdAddCard className="text-3xl" />
          <h2 className="text-2xl mt-3"> Add Tasks</h2>
        </button>
      )}
    </div>
  );
};

export default Card;
