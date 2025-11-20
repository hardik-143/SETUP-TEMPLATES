import Link from "next/link";

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Next.js Auth Example</h1>
      <p>
        Simple signup/login using MongoDB, Mongoose, JWT and httpOnly cookie.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Log in</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}
