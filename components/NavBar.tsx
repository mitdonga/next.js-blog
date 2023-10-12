'use client'

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NavBar() {
  const session = useSession()
  const router = useRouter()
  
  return (
    <div className='h-12 bg-cyan-100 min-h-max w-full flex justify-between'>
      <Link href="/"><h2 className='p-2 px-4'>Logo</h2></Link>
      <div className='self-center'>
        <Button className='mr-4' variant="text" onClick={() => router.push("/blogs/create")}>Write</Button>
        <Button variant="text" onClick={() => router.push("/blogs")}>My Blogs</Button>
      </div>
      <div className='self-center'>
        { session?.data?.user ?
          <Button variant="text" onClick={() => signOut()}>SingOut</Button> :
          <Button variant="text" onClick={() => signIn()}>SingIn</Button>
        }
      </div>
    </div>
  )
}
