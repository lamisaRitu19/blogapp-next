'use client'

import React, { useEffect, useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { generateClient } from 'aws-amplify/api';
import { createPost } from '@/src/graphql/mutations';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

const client = generateClient();

export default function page() {
  const initialState = { title: "", content: "", username: ""};
  const [post, setPost] = useState(initialState);
  const { title, content } = post;
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value
    }))
  }

  const handleCreatePost = async () => {
    try {
      if (!title && !content) return;

      const {username, userId, signInDetails} = await getCurrentUser();
      post.username = username;
      await client.graphql({
        query: createPost,
        variables: { input: post },
        authMode: 'userPool'
      })
      router.push('/myPost')
      // console.log("🚀 ~ handleCreatePost ~ post:", post)
    } catch (error) {
      console.log("🚀 ~ handleCreatePost ~ error:", error) 
    }
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
          className='w-full rounded-lg px-6 py-2 mb-3'
        ></input>
        <SimpleMDE
          value={post.content}
          onChange={(value) => setPost({...post, content: value})}
        />

        <div className='mt-1'>
          <button className='font-semibold rounded-lg px-5 py-2 mr-3 bg-cyan-600 text-white'>Add Cover Image</button>
          <button onClick={handleCreatePost} className='font-semibold rounded-lg px-6 py-2 bg-cyan-700 text-white'>Create Post</button>
        </div>
      </div>
    </div>
  )
}
