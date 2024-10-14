import React ,{useState, useEffect} from 'react'
import Card from '../components/Home/Card'
import axios from 'axios';
const Incompleted = () => {
  const [Data,setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")} `,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://tms-bakcen-api.onrender.com/api/v2/get-incomplete-tasks",
        {
          headers,
        }
      );
      setData(response.data.data);
    };
    fetch();
  });
  return (
    <div><Card home={false} data={Data}/></div>
  )
}

export default Incompleted