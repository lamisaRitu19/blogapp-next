import Comments from '@/app/components/Comments';
import getPost from '@/lib/getPost'
import React, { Suspense } from 'react'

export default async function page({ params }: { params: { id: number } }) {
    const post = await getPost(params.id);

    return (
        <div className="container mx-auto my-10">
            <h3 className="text-3xl font-semibold mb-2 text-cyan-900">{post.title}</h3>
            <p className="mb-2">Author id:{post.userId}</p>
            <p className="text-lg text-gray-500">{post.body}</p>
            <div className='mx-12 mt-6'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Comments postId={post.id}></Comments>
                </Suspense>
                <button className='font-semibold rounded-lg px-4 py-2 mt-4 bg-cyan-700 text-white'>Write a comment</button>
            </div>
        </div>
    )
}
