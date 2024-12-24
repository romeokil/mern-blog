import React,{useState} from 'react'

function Register(){
    
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    async function register(e)
    {
        e.preventDefault();
        let response=await fetch('https://mern-blog-updated.onrender.com/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
            })
            console.log(response);
        if(response.status===200){
            alert("Registration Successful!!!")
        }
        else{
            alert('Registration Failed!!!!')
        }

    }

    return (
    <>
        <h2 className='text-2xl text-black text-center font-bold mt-12'>Register Form</h2>
        <form action="" className='max-w-screen-md my-4 mx-auto'
            onSubmit={register}>
            <input type="text" placeholder="Enter Your Username" className='block w-full my-4 mx-auto px-2 py-3 border-2 border-gray-400 m-5 text-base placeholder:text-slate-600'
                value={username}
                onChange={(e)=>setusername(e.target.value)}
            />
            <input type="password" placeholder="Enter Your Password" className='block w-full my-4 mx-auto px-2 py-3 border-2 border-gray-400 m-5 text-base placeholder:text-slate-600'
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
            <button type="text" className='block w-full my-4 mx-auto px-2 py-3 text-xl text-white bg-blue-400 hover:bg-blue-800 border-2 border-gray-400 m-5'>Submit</button> 
        </form>
    </>
    )
}

export default Register