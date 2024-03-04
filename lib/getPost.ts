export default async function getPost(id: number) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}
