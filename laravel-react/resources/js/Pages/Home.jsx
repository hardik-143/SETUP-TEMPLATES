import { Link } from '@inertiajs/inertia-react'
import Layout from '../components/Layout/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-bold mb-3">Home Page</h1>
        <Link href="/about" className="underline">
          About
        </Link>
      </div>
    </Layout>
  )
}
