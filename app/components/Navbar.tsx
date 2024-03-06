"use client"

import { getCurrentUser } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Navbar() {
    const [signedUser, setSignedUser] = useState(false);
    useEffect(() => {
        authListener();
    }, [])

    const authListener = async() => {
        Hub.listen('auth', ({ payload }) => {
            switch (payload.event) {
              case 'signedIn':
                setSignedUser(true);
                break;
              case 'signedOut':
                setSignedUser(false);
                break;
            }
        });
        try {
            const {username, userId, signInDetails} = await getCurrentUser()
            setSignedUser(true);
        } catch (error) {
            console.log("🚀 ~ authListener ~ error:", error)            
        }
    }

    return (
        <div className='flex justify-center space-x-6 border-b py-3 bg-cyan-500 border-gray-300'> 
            <Link 
                href="/"
                className='text-lg font-medium rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            >Home</Link>
            {
                signedUser && <>
                    <Link 
                        href="/createPost"
                        className='text-lg font-medium rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    >Create Post</Link>
                    <Link 
                        href="/myPost"
                        className='text-lg font-medium rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    >My Post</Link>
                </>
            }
            <Link 
                href="/profile"
                className='text-lg font-medium rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            >Profile</Link>
        </div>
    )
}