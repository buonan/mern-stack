
import Link from 'next/link'

function HomePage() {
  return (
    <div>
      <div>Welcome to Next.tsx!</div>
      <Link href="/users">
        <a>Users</a>
      </Link>
    </div>
  )
}

export default HomePage