import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  console.log(session);
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>{session?.user?.email || "Please Login"}</h1>
      <h2>{session?.user?.id}</h2>
      {
        session ?
        <Button variant="text" onClick={() => signOut()}>SingOut</Button> :
        <Button variant="text" onClick={() => signIn()}>SingIn</Button>
      }
    </main>
  )
}
