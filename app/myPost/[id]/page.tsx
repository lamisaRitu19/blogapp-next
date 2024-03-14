'use client'

import { getPost } from '@/src/graphql/queries';
import { cookieBasedClient } from '@/app/utils/serverClientUsingCookies';
import { useEffect, useState } from 'react';
import { MyPost } from '@/types/types';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export default function page({ params }: { params: { id: string } }) { 
    const [post, setPost] = useState<MyPost>({
        id: '',
        title: '',
        content: '',
    });
    const [addComment, setAddComment] = useState(false);
    useEffect(() => {
        fetchPost()
    }, [])

    const fetchPost = async() => {
        try {
          const postData = await client.graphql({
            query: getPost,
            variables: { id: params.id }
          })
          const checkData = postData.data.getPost;
          if (checkData){
            setPost(checkData);
          }
          // console.log("🚀 ~ fetchPost ~ checkData:", checkData)
        } catch (error) {
          console.log("🚀 ~ fetchPost ~ error:", error)
        }
    }

    const handlePostComment = () => {

    }

    return (
        <div className="container mx-auto my-10">
            <h3 className="text-3xl font-semibold mb-2 text-cyan-900">{post?.title}</h3>
            <p className="text-sm mb-2">Author name: {post?.username}</p>
            <p className="text-lg mb-3 text-gray-500">{post?.content}</p>
            {
                !addComment && <button onClick={() => setAddComment(true)} className='text-sm font-semibold rounded-lg px-3 py-2 mr-3 bg-cyan-600 text-white'>Add a comment</button>
            }
            {
                addComment && <div className='flex gap-3'>
                    <input 
                        placeholder='Write comment' 
                        name='comment'
                        className='w-2/3 rounded-lg px-6 py-1 bg-slate-200 text-slate-500'
                    ></input>
                    <button onClick={handlePostComment} className='text-sm font-semibold rounded-lg px-3 py-1 bg-cyan-700 text-white'>Post comment</button>
                </div>
            }
            {/* <div className='mx-12 mt-6'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Comments postId={post.id}></Comments>
                </Suspense>
                <button className='font-semibold rounded-lg px-4 py-2 mt-4 bg-cyan-700 text-white'>Write a comment</button>
            </div> */}
        </div>
    )
}
