'use client'

import { generateClient } from 'aws-amplify/api';
import { listPosts } from '@/src/graphql/queries';
import { MyPost } from '@/types/types';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { deletePost } from '@/src/graphql/mutations';

const client = generateClient();

export default function page() {
  const [posts, setPosts] = useState<MyPost[]>([]);
  useEffect(() => {
    fetchPosts()
  }, [posts])

  const fetchPosts = async() => {
    try {
      const postsData = await client.graphql({
        query: listPosts
      })
      // console.log("🚀 ~ postsData ~ postsData:", postsData)
      setPosts(postsData.data.listPosts.items)
    } catch (error) {
      console.log("🚀 ~ fetchPosts ~ error:", error)
    }
  }

  const handleDeletePost = async(id:string) => {
    try {
      const postDetails = {
        id: id
      };
      await client.graphql({
        query: deletePost,
        variables: { input: postDetails },
        authMode: 'userPool'
      })
    } catch (error) {
      console.log("🚀 ~ handleDeletePost ~ error:", error)
    }
  }
  
  return (
    <div className="container mx-auto mb-10">
      <h1 className="text-3xl text-center font-semibold mt-10 mb-6">My Posts</h1>    
      {
        posts.map(post => <div key={post.id} className="border-b border-gray-300 pt-10 pb-4">
          <h3 className="text-xl font-semibold mb-2 text-cyan-900">{post.title}</h3>
          <p className="mb-2">Author id: {post.username}</p>
          <p className="text-gray-500">{post.content}</p>
          <div className='flex gap-3 mt-3'>
            <button className='text-sm font-semibold rounded-full px-3 py-1 bg-blue-300 hover:bg-blue-400 text-white'><Link href={`/myPost/${post.id}`}>View</Link></button>
            <button className='text-sm font-semibold rounded-full px-3 py-1 bg-orange-300 hover:bg-orange-400 text-white'><Link href={`/editPost/${post.id}`}>Edit</Link></button>
            <button onClick={() => handleDeletePost(post.id)} className='text-sm font-semibold rounded-full px-3 py-1 bg-red-300 hover:bg-red-400 text-white'>Delete</button>
          </div>
        </div>)
      } 
    </div>
  )
}
