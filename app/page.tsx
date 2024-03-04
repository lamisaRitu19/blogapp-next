import getPosts from "@/lib/getPosts";
import Link from "next/link";
import { Suspense } from "react";
import Comments from "./components/Comments";

export default async function Home() {
  interface postObj {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  const posts = await getPosts();
  
  return (
    <main className="container mx-auto mb-10">
      <h1 className="text-3xl text-center font-semibold mt-10 mb-6">All Posts</h1>
      {
        posts.map((post: postObj) => <div key={post.id} className="border-b border-gray-300 pt-10 pb-4">
          <Link 
            href={`/posts/${post.id}`}
          >
              <h3 className="text-xl font-semibold mb-2 text-cyan-900">{post.title}</h3>
              <p className="mb-2">Author id:{post.userId}</p>
              <p className="text-gray-500">{post.body}</p>
              <div className='mx-12 mt-6'>
                <Suspense fallback={<div>Loading...</div>}>
                  <Comments postId={post.id}></Comments>
                </Suspense>
              </div>
          </Link>
        </div>)
      }
    </main>
  );
}
