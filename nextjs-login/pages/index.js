import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Next.js Auth Example</h1>
      <p>
        Authentication using NextAuth.js with MongoDB and credentials provider.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        {!session ? (
          <>
            <Link href="/signup">Sign up</Link>
            <Link href="/login">Log in</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => signOut({ redirect: false })}>
              Sign out
            </button>
          </>
        )}
      </div>
      {session && (
        <p style={{ marginTop: 20 }}>Signed in as: {session.user.email}</p>
      )}
    </div>
  );
}
