import React from 'react'                 
import axios from 'axios';
import './App.css'
            
function Login({setCredentials,setLoginStatus}) {


    const onSubmit = ()=>{
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        //set the state if both username and password is not null
        if(username && password)
        {
             document.getElementById('username').value="";
             document.getElementById('password').value="";
             
            setCredentials({
                username:username
            })

            axios.post('http://localhost:3000/login',{username:username})
            .then((response)=>{
                const { accessToken, refreshToken} = response.data;
                localStorage.setItem('accessToken',accessToken);
                localStorage.setItem('refreshToken',refreshToken);
                setLoginStatus(true)
            })
        }
        
    }

  return (
    <div className="main-layout">
        <div>
            <div className="title">
                <h1>JWT</h1>
            </div>
            <div>
                <input type="text" id="username" placeholder='username'/>
            </div>
            <div>
                <input type="text" id="password" placeholder="password"/>
            </div>
            <div className='loginButton'>
                <button onClick={onSubmit}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login