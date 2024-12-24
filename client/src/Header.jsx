import React, {useState, useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
function Header() {
  const {userInfo,setuserInfo}=useContext(UserContext);
  useEffect(()=>{
    fetch('https://mern-blog-updated.onrender.com/profile',{
      credentials:'include',
    }).then(res=>{
      res.json().then(response=>{
        console.log(response.username)
        setuserInfo({username:response.username});
      })
    })
  },[setuserInfo])

  function logout(){
      fetch('https://mern-blog-updated.onrender.com/logout',{
        credentials:'include',
        method:'POST',
      })
      setuserInfo(null);
  }
  const username=userInfo?.username;
  console.log("username hai ye",username)
  return (
    <>
        <header className='flex justify-around items-center m-4'>
            <Link to="/" className='text-lg font-bold text-black p-4 rounded px-3 py-2'>Rahul Blogs</Link>
            <nav className='flex justify-between items-center gap-4'>
              {username && 
                <>
                  <Link to ='/create' className='text-xl font-semibold text-black px-3 py-2 rounded'>Create New Post</Link>
                  <a onClick= {logout} className='text-xl font-semibold text-black px-3 py-2 rounded'>Logout</a>
                </>
              }
              {!username &&
                <>
                <Link to="/login" className='text-xl font-semibold text-black px-3 py-2 rounded'>Login</Link>
                <Link to="/register" className='text-xl font-semibold text-black px-3 py-2 rounded'>Register</Link>
                </>

              }
            </nav>
        </header>
    </>
  )
}

export default Header