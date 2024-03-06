'use client'

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react'
import React from 'react'
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@/app/aws-exports';
Amplify.configure(awsExports);

export default function Profile() {
  return (
    <Authenticator className='pt-20'>
      {
        ({signOut, user}) => (
          <div className="container mx-auto my-10">
            <h3 className="text-3xl font-semibold mb-3 text-cyan-900">Profile</h3>
            <p className="text-lg mb-2 text-gray-500">Username: {user?.username}</p>
            <p className="text-lg mb-6 text-gray-500">Email: </p>
            <button onClick={signOut} className='font-semibold rounded-lg px-6 py-2 bg-red-800 text-white'>Sign Out</button>
          </div>
        )
      }
    </Authenticator>
  )
}
