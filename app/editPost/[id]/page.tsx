'use client'

import { getPost } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import React, { useEffect, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { FetchedPost, MyPost } from "@/types/types";
import { useRouter } from "next/navigation";
import { updatePost } from "@/src/graphql/mutations";

const client = generateClient();

export default function page({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<MyPost>({});
    console.log("🚀 ~ page ~ post:", post)
    const { title, content } = post;
    const router = useRouter();
    useEffect(() => {
      fetchPost()
    }, [])
  
    const fetchPost = async() => {
      try {
        const postData = await client.graphql({
          query: getPost,
          variables: { id: params.id }
        })
        console.log("🚀 ~ fetchPost ~ postData:", postData.data.getPost?.content)
        setPost(postData.data.getPost);
      } catch (error) {
        console.log("🚀 ~ fetchPost ~ error:", error)
      }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost(() => ({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdatePost = async () => {
        try {
            if (!title && !content) return;
        
            await client.graphql({
                query: updatePost,
                variables: { input: post }
            })
            router.push('/myPost')
            console.log("🚀 ~ handleUpdatePost ~ post:", post)
        } catch (error) {
            console.log("🚀 ~ handleCreatePost ~ error:", error) 
        }
    }
  
    return (
        <div className="pb-10 bg-slate-200">
            <div className='container mx-auto'>
                <h2 className="text-2xl text-center font-semibold pt-10 mb-6">Edit post</h2>
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
                <button className='font-semibold rounded-lg px-6 py-2 bg-cyan-700 text-white'>Save Post</button>
                </div>
            </div>
        </div>
    )
}
