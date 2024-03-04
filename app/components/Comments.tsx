import getPostComments from '@/lib/getPostComments';
import React from 'react'

export default async function Comments({ postId }: { postId: number }) {
    const comments = await getPostComments(postId);
    interface commentObj {
        postId: number;
        id: number;
        name: string;
        email: string;
        body: string;
    }

    return (
        <>
            {
                comments.map((comment: commentObj) => <div
                    key={comment.id}
                    className="rounded-lg shadow-md py-3 px-8 mb-4 bg-white"
                >
                    <p className="text-gray-500 mb-2">{comment.body}</p>
                    <p className="text-gray-300">{comment.name}</p>
                </div>)
            }
        </>
  )
}
