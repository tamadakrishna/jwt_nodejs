import React,{useState} from 'react'
import Login from './Login'
import Student from './Student';
function App() {

  const [credentials, setCredentials] = useState({ username:"" });

  const [loginStatus, setLoginStatus] = useState(false)

console.log(credentials)
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