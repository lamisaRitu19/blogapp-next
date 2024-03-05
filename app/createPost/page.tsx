'use client'

import React, { useEffect, useState } from 'react'

export default function page() {
  const initialState = { title: "", content: ""};
  const [post, setPost] = useState(initialState);
  
  useEffect(() => {
    console.log(post)
  }, [post])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="pb-10 bg-slate-200">
      <div className='container mx-auto'>
        <h2 className="text-2xl text-center font-semibold pt-10 mb-6">Create a new post</h2>
        <input 
          placeholder='Title' 
          name='title'
          onChange={onChange}
          value={post.title}
          className='w-full rounded-lg px-6 py-2'
        ></input>
        <div className='mt-4'>
          <button className='font-semibold rounded-lg px-5 py-2 mr-3 bg-cyan-600 text-white'>Add Cover Image</button>
          <button className='font-semibold rounded-lg px-6 py-2 bg-cyan-700 text-white'>Create Post</button>
        </div>
      </div>
    </div>
  )
}
