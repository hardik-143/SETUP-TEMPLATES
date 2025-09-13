import { Link } from '@inertiajs/inertia-react'
import Layout from '../components/Layout/Layout'

export default function About() {
  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="text-3xl font-bold mb-3">About Us Page</h1>
          <Link href="/" className="underline">
            Home
          </Link>
        </div>
      </Layout>
    </>
  )
}
