import React, { useState } from 'react'
import './App.css'
import axios from 'axios';

function Student({setLoginStatus}) {

  const [studentsData, setStudentsData] = useState(null);

  const onSubmit = ()=>{

    const accessToken = localStorage.getItem('accessToken');
    
    axios.get('http://localhost:3000/students',{
        headers: {
            'authorization': accessToken,
        }
    })
    .then((response)=>{
        setStudentsData(response.data)
    })
    .catch((err=>{
        console.log(err)
    }))
  }

  return (
    <div className='Student'>
        <div className='banner'>
            <div className="logout">
                <button onClick={()=>{
                    setLoginStatus(false);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    }}>Logout</button>
            </div>
        </div>
        <div className='Studentbody'>
            <div className='get'>
                <button className='get' onClick={onSubmit}>GET STUDENTS</button>
            </div>
            <div className='data'>
                <ul>
                    {
                        studentsData?.map((info,index)=>{
                            return <li key={index}>{info.name}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Student