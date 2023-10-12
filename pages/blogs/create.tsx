
'use client'

import React, { ReactComponentElement, useRef, useState } from 'react'
import Layout from './layout'
import { Button, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import { Blog } from '@/types'

export default function CreateBlog() {
  const session = useSession()

  const [blog, setBlog] = useState<Blog>({
    title: '',
    content: '',
    slug: '',
    published: false
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    const { value, name } = event.target;
    setBlog((prev) => ({...prev, [name]: value}))
  }
  function handlePublish() {
    console.log(blog);
  }

  return (
    <Layout>
      <h1 className='text-2xl'>Write Blog</h1>
      <div className='mt-10'>
        <TextField 
          fullWidth 
          label='Title' 
          name="title"
          className='mb-5'
          onChange={handleChange}
        />
        <TextField 
          fullWidth 
          label='Slug' 
          name="slug"
          className='mb-5'
          onChange={handleChange}
        />
        <TextField 
          label='Content' 
          className='mb-5'
          name="content"
          minRows={5}
          fullWidth multiline 
          onChange={handleChange}
        />
        <Button 
          color="primary" 
          size="large"
          onClick={handlePublish}
        >
          Publish
        </Button>
      </div>
    </Layout>
  )
}
