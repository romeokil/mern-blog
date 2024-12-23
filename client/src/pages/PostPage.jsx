import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faArrowLeft } from '@fortawesome/free-solid-svg-icons'


export default function PostPage(){
    const {id}= useParams();
    const[postinfo,setpostinfo]=useState(null)
    useEffect(()=>{
        fetch(`http://localhost:8000/post/${id}`)
        .then(response=>
            response.json()
            .then(post=>{
                setpostinfo(post)
                // console.log("useEffect ke andr wala post jaha set kr rhe the")
                // console.log(post)
                // console.log("fetch ke ander wala and post",post)
            }
            ))
            .catch((error)=>{
                console.log("Tetch ke ander ni ja paaya",error)
            })
    },[])
    // console.log("setpost ke upr");
    // console.log(postinfo);
    // console.log("setpost ke niche");
    // console.log("Postinfo me daata gya hi ni")
    // console.log("postinfo",postinfo)

    if(!postinfo) return "no"
    
    return (
        <div className="bg-slate-600 text-center w-full p-10 h-full">
            <div className='flex flex-start'>
                <Link to="/">
                <button className='p-2 text-white bg-blue-950 rounded-xl text-sm text-left'>
                <FontAwesomeIcon className='mr-2 ' icon={faArrowLeft} fade />
                    Go Back to Home Page
                </button>
                </Link>
            </div>
            <p className='text-yellow-200 text-center text-4xl underline m-3'>Title</p>
            <div className="text-white font-bold text-3xl">{postinfo.title}</div>
            <div className="text-slate-800 text-xl my-4">{postinfo.createdAt}</div>
            <div className="text-2xl text-slate-200 my-4"> By <span className="text-orange-500 underline">{postinfo.author.username}</span> </div>
            <Link to={`/edit/${postinfo._id}`} className='bg-black text-white p-2 rounded w-1/4 m-auto'>
            <FontAwesomeIcon icon={faPenToSquare} beatFade /><span className='ml-1'>Edit this post</span></Link>
            <div className="w-full h-3/4 my-3 flex justify-center items-center">
                <img className="w-3/4 object-cover object-center" src={`http://localhost:8000/${postinfo.cover}`}></img>
            </div>
            <div className=" my-2 flex justify-center items-center flex-col">
                <p className="text-yellow-200 text-center text-2xl underline">Summary</p>
                <p className="text-xl text-white font-normal mt-2">{postinfo.summary}</p>
            </div>
            <p className="text-yellow-200 text-center text-2xl underline">Content</p>
           <div dangerouslySetInnerHTML={{__html:postinfo.content}} className="m-3  text-lg font-light text-white"></div>
        </div>
    )
}