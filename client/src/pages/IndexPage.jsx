import React,{useEffect,useState} from 'react'
import Template from '../Template.jsx'
function IndexPage(){
    const[posts,setposts]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:8000/post').then(response=>{
        response.json().then((posts)=>{
            console.log(posts)
            setposts(posts)
        })
    })
    },[])
    
    return (
        <>
           
            {/* {posts.length}  */}
            {posts.length>0 && posts.map(post=>{
               return <Template {...post}/>
            })}
        </>
    )
}
export default IndexPage