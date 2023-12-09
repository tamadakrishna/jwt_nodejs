import React from 'react'
import './App.css'

function Student({setLoginStatus}) {
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

        </div>
    </div>
  )
}

export default Student