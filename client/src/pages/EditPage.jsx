import React,{useEffect, useState} from 'react'
import {Navigate, useParams} from 'react-router-dom'
import Editor from './Editor'
function EditPage() {
    const {id}=useParams();
    const [title,settitle]=useState('');
    const [summary,setsummary]=useState('');
    const [content,setcontent]=useState('');
    const [files,setfiles]=useState('');
    const [redirect,setredirect]=useState(false);
    const [error,seterror]=useState(false);

    useEffect(()=>{
        fetch('https://mern-blog-updated.onrender.com/post/'+id)
        .then(response=>{
            response.json()
            .then(postinfo=>{
                // console.log(postinfo)
                settitle(postinfo.title);
                setsummary(postinfo.summary);
                setcontent(postinfo.content);
                
                setfiles(postinfo.cover);
                // console.log("Useffect ke andr hai or console ke upr hai...");
                // console.log("title daal rha hai",postinfo.title)
                // console.log("file daal rhe hai",postinfo.cover)
                // console.log("useffect ka ander console ke niche wala hai files check kr rhe hai ki store hua ki ni kuch")
            })
        })
    },[])

    async function UpdatePost(ev){
        console.log("Updatepostcalled")
        ev.preventDefault();
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        console.log("updatePost ke andr wala file dekh rhe hai",files);
        data.set('file',files);
        const response=await fetch('https://mern-blog-updated.onrender.com/post',{
            method:'PUT',
            body:data,
            credentials:'include',
        })
        console.log("response check krne ke liye taaaki pata chale ye edit q ni ho rha hai",response)
        if(response.status===400){
            console.log("400 Bad request!!!")
            seterror(true)
        }
        else if(response.status===300){
            alert('Sorry but you need to signIin')
        }
        else if(response.status===200){
            console.log("201 Good request!!!!")
            setredirect(true)
        }
    }
    if(redirect){
        console.log("shi wala redirect ke andr hai")
        alert('Congrats,Updation Successfull !!!!!!!!!!!')
        return  <Navigate to={'/post/'+id}/>
     }
    if(error){
        console.log("galat redirect me ghuss gy hai!!")
        alert('You are Not the actual Author');
        return <Navigate to={'/post/'+id}/>
    }
  return (
    <>
        <form onSubmit={UpdatePost}className='max-w-screen-md my-4 mx-auto' >
            <input type="title" 
                placeholder={'Title'} 
                value={title}
                onChange={ev=>settitle(ev.target.value)}
                className='block w-full my-4 mx-auto px-2 py-3 border-2 border-gray-400 m-5 text-base placeholder:text-slate-600'/>
            <input type="summary" 
                placeholder={'Summary'}
                value={summary}
                onChange={ev=>setsummary(ev.target.value)}
                className='block w-full my-4 mx-auto px-2 py-3 border-2 border-gray-400 m-5 text-base placeholder:text-slate-600'/>
            <input type="file" 
            name='image'
                onChange={ev=>setfiles(ev.target.files[0])}
                className='block w-full my-4 mx-auto px-2 py-3 border-2 border-gray-400 m-5 text-base placeholder:text-slate-600'/>
            <Editor onChange={setcontent} value={content}/>
            <button 
                className='block w-full my-4 mx-auto px-2 py-3 text-xl text-white bg-green-400 hover:bg-green-800 border-2 border-gray-400 m-5'>Update Post</button>
        </form>
    </>
  )
}

export default EditPage