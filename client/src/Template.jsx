import React from 'react'
import {formatISO9075} from 'date-fns'
import {Link} from 'react-router-dom'

function Template({_id,title,content,createdAt,summary,cover,author}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 m-8'>
      <div className=''>
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:8000/'+cover} alt="this is an image"/>
        </Link>
      </div>
      <div>
        <Link to={`/post/${_id}`}>
        <h3 className='text-xl font-bold'>{title}</h3>
        </Link>
        <p className='flex gap-4'>
          <a className='text-lg text-purple-800' href="">{author.username}</a>
          <time className='text-lg text-yellow-500' >{formatISO9075(createdAt)}</time>
        </p>
        <p className='text-xl font-semibold'>{summary}</p>
      </div>
    </div>
  )
}

export default Template