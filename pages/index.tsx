import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  return (
    <main
      className={`flex  flex-col items-center justify-between p-5 ${inter.className}`}
    >
      <h1>Welcome {session?.user?.name}</h1>
    </main>
  )
}
