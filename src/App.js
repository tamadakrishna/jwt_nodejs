import React,{useEffect, useState} from 'react'
import Login from './Login'
import Student from './Student';
import axios from 'axios';

function App() {

  const [credentials, setCredentials] = useState({ username:"" });

  const [interval,setIntervalId] = useState(null);

  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(()=>{
    if(!loginStatus && interval)
    {
      clearInterval(interval); // Cleanup interval on logout
    }
  },[loginStatus,interval])

  useEffect(()=>{
    const refreshAccessToken = ()=>{

      const refreshToken = localStorage.getItem('refreshToken');

      if(refreshToken){

          axios.post('http://localhost:3000/refresh',{
          username:credentials.username,
          refreshToken:refreshToken,
        })
        .then((response)=>{
          const {accessToken} = response.data;
          localStorage.setItem('accessToken',accessToken);  // set the new access token again          
        })
        .catch((error)=>{
          if(error.response.status===403)
          {
            setLoginStatus(false)
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            clearInterval(interval);
          }
        })

      }

      

    }

    const intervalId = setInterval(refreshAccessToken, 3 * 60 * 1000); // Refresh every 3 minutes

    setIntervalId(intervalId) // saved for logout cleanup

    return () => clearInterval(intervalId); // Cleanup interval on unmount

  },[])

  return (
    <div>
      { 
      !loginStatus 
        ? <Login setCredentials={setCredentials} setLoginStatus={setLoginStatus}/> 
        : <Student setLoginStatus={setLoginStatus}/>
      }
    </div>
  )
}

export default App