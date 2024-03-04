export default async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}
