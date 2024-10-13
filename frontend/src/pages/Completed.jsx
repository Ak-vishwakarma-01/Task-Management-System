import React, { useState , useEffect } from 'react'
import Card from '../components/Home/Card'
import axios from 'axios';
const Completed = () => {
  const [Data,setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")} `,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-complete-tasks",
        {
          headers,
        }
      );
      setData(response.data.data);
    };
    fetch();
  });
  return (
    <div>
      <div>
        <Card home={false} data ={Data}/>
      </div>
    </div>
  )
}

export default Completed