import React,{useState} from 'react'
import ReactQuill from 'react-quill'
import {Navigate} from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
const modules={
    toolbar:[
        [{'header':[1,2,false]}],
        ['bold','italic','underline','strike','blockquote'],
        [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'}],
        [{'link':'image'}],
        ['clean']
    ]
};
const formats=[
    'header',
    'bold','italic','underline','strike','blockquote',
    'list','bullet','indent',
    'link','image'
];
function CreatePost(){
    const [title,settitle]=useState('');
    const [summary,setsummary]=useState('');
    const [content,setcontent]=useState('');
    const [files,setfiles]=useState('');
    const [redirect,setredirect]=useState(false);
    async function createNewPost(ev){
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        console.log(files);
        data.append("file",files);
        ev.preventDefault();
        console.log("Data",{data})
        const response=await fetch('https://mern-blog-updated.onrender.com/post',{
            method:'POST',
            body:data,
            credentials:'include',
        })
        console.log(response);
        console.log("response.ok wala")
        if(response.ok){
            setredirect(true);
            console.log("response.ok ke andr");
        }
        const res=await response.json();
        console.log("res", {response});
        console.log("bhai response ke baad")
    }
    if(redirect){
       return  <Navigate to={'/'}/>
    }
    return (
        <>
            <form onSubmit={createNewPost}className='max-w-screen-md my-4 mx-auto' >
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
                < ReactQuill 
                    value={content} 
                    onChange={newValue=>setcontent(newValue)}
                    modules={modules}
                    formats={formats}/>
                <button 
                    className='block w-full my-4 mx-auto px-2 py-3 text-xl text-white bg-orange-400 hover:bg-orange-800 border-2 border-gray-400 m-5'>Create New Post</button>
            </form>
        </>
    )
}

export default CreatePost;