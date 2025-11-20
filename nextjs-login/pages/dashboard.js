import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

export default function Dashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) Router.push("/login"); // Not logged in
  }, [session, status]);

  async function handleLogout() {
    await signOut({ redirect: false });
    Router.push("/");
  }

  if (status === "loading") {
    return <div style={{ fontFamily: "Arial", padding: 20 }}>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Dashboard</h2>
      <p>Welcome, {session.user.email}</p>
      <p>Your id: {session.user.id}</p>
      <div style={{ marginTop: 12 }}>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}
