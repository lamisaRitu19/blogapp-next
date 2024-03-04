export default async function getPostComments(id: number) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}
