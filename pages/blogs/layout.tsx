import React from 'react'

export default function ({ children }: { children: React.ReactNode}) {
  return (
    <div className='mt-5 px-12'>
      {children}
    </div>
  )
}
