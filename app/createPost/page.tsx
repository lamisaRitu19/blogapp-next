import React from 'react'

export default function page() {
  return (
    <div className="pb-10 bg-slate-200">
      <div className='container mx-auto'>
        <h2 className="text-2xl text-center font-semibold pt-10 mb-6">Create a new post</h2>
        <form>
          <input placeholder='Title' className='w-full px-4 py-1'></input>
        </form>
      </div>
    </div>
  )
}
