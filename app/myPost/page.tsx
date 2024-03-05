'use client'

import { listPosts } from '@/src/graphql/queries';
import { MyPost } from '@/types/types';
import { generateClient } from 'aws-amplify/api';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [posts, setPosts] = useState<MyPost[]>([]);
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async() => {
    try {
      const postsData = await generateClient().graphql({
        query: listPosts
      })
      // console.log("🚀 ~ postsData ~ postsData:", postsData)
      setPosts(postsData.data.listPosts.items)
    } catch (error) {
      console.log("🚀 ~ fetchPosts ~ error:", error)
    }
  }
  
  return (
    <div className="container mx-auto mb-10">
      <h1 className="text-3xl text-center font-semibold mt-10 mb-6">My Posts</h1>    
      {
        posts.map(post => <div key={post.id} className="border-b border-gray-300 pt-10 pb-4">
          <Link 
            href={`/posts`}
          >
              <h3 className="text-xl font-semibold mb-2 text-cyan-900">{post.title}</h3>
              <p className="mb-2">Author id: {post.username}</p>
              <p className="text-gray-500">{post.content}</p>
              {/* <div className='mx-12 mt-6'>
                <Suspense fallback={<div>Loading...</div>}>
                  <Comments postId={post.id}></Comments>
                </Suspense>
              </div> */}
          </Link>
        </div>)
      } 
    </div>
  )
}
