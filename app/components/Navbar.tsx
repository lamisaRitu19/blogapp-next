import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    const navItems = [
        {
            id: 1,
            title: "Home",
            url: "/"
        },
        {
            id: 2,
            title: "Create Post",
            url: "/createPost"
        },
        {
            id: 3,
            title: "Profile",
            url: "/profile"
        },
        {
            id: 4,
            title: "My Post",
            url: "/myPost"
        },
    ]
    return (
        <div className='flex justify-center space-x-6 border-b py-3 bg-cyan-500 border-gray-300'>
            {
                navItems.map(item => <Link 
                    href={item.url} 
                    key={item.id}
                    className='text-lg font-medium rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                >{item.title}</Link>)
            }
        </div>
    )
}