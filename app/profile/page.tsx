import React from 'react'

export default function page() {
  return (
    <div className="container mx-auto my-10">
      <h3 className="text-3xl font-semibold mb-3 text-cyan-900">Profile</h3>
      <p className="text-lg mb-2 text-gray-500">Username:</p>
      <p className="text-lg mb-6 text-gray-500">Email: </p>
      <button className='font-semibold rounded-lg px-6 py-2 bg-red-800 text-white'>Sign Out</button>
    </div>
  )
}
