import { getPost } from '@/src/graphql/queries';
import { cookieBasedClient } from '@/app/utils/serverClientUsingCookies';

export const revalidate = 3600;

export default async function page({ params }: { params: { id: string } }) { 
    const post = await cookieBasedClient.graphql({
        query: getPost,
        variables: { id: params.id }
    });
    const myPost = post.data.getPost
    // console.log("🚀 ~ page ~ post:", myPost)

    return (
        <div className="container mx-auto my-10">
            <h3 className="text-3xl font-semibold mb-2 text-cyan-900">{myPost?.title}</h3>
            <p className="mb-2">Author name: {myPost?.username}</p>
            <p className="text-lg text-gray-500">{myPost?.content}</p>
            {/* <div className='mx-12 mt-6'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Comments postId={post.id}></Comments>
                </Suspense>
                <button className='font-semibold rounded-lg px-4 py-2 mt-4 bg-cyan-700 text-white'>Write a comment</button>
            </div> */}
        </div>
    )
}
