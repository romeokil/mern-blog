import React,{useState,useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext';
function LoginPage(){
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [redirect,setredirect]=useState(false);
    const {setuserInfo}=useContext(UserContext);
    async function login(ev){
        ev.preventDefault();
        let response=await fetch('https://mern-blog-updated.onrender.com/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'Application/json'},
            credentials:'include'
        })
        console.log(response);
        if(response.ok){
            response.json().then(userInfo=>{
                console.log(userInfo)
                setuserInfo(userInfo);
                setredirect(true);
            })
           
        }
        else{
            alert('Login Failed!!!')
        }
    }
    console.log(redirect)
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <>
        <h2 className='text-2xl text-black text-center font-bold mt-12'>Login Form</h2>
        <form action="" className='max-w-screen-md my-4 mx-auto' onSubmit={login}>
            <input type="text" placeholder="Enter Your Username" className='block w-full my-4 mx-auto px-2 py-3 border-2 border-gray-400 m-5 text-base placeholder:text-slate-600'
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            />
            <input type="password" placeholder="Enter Your Password" className='block w-full my-4 mx-auto px-2 py-3 border-2 border-gray-400 m-5 text-base placeholder:text-slate-600'
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            />
            <button type="text" className='block w-full my-4 mx-auto px-2 py-3 text-xl text-white bg-green-400 hover:bg-green-800 border-2 border-gray-400 m-5'>Submit</button> 
        </form>
        </>
    )
}
export default LoginPage