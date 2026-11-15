"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { join } from "@/lib/members";

export default function JoinForm({ onDone }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("3 to 16 letters, numbers or _");
  const [done, setDone] = useState(null);

  if (done)
    return (
      <>
        <h2>You’re in, {done.username}</h2>
        <p>Your member code is:</p>
        <p style={{ fontSize: 24, letterSpacing: ".15em", color: "#fff", margin: "6px 0 14px" }}>{done.code}</p>
        <p>Keep it safe. To come back, click the ZNS logo on the homepage and enter this code or your username.</p>
        <button className="co" style={{ width: "100%" }} onClick={() => { onDone(); router.push("/exclusive"); }}>
          Enter Exclusive
        </button>
      </>
    );

  const submit = () => {
    const r = join(email, username);
    if (r.error) setErr(r.error);
    else setDone(r);
  };

  return (
    <>
      <h2>Join the Exclusive List</h2>
      <p>Get a personal member code for early access to limited drops, collabs and the members-only page.</p>
      <input type="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Choose a username" maxLength={16} aria-label="Username" value={username}
        onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
      <p style={{ color: "var(--em2)", minHeight: "1.4em", margin: "0 0 8px" }}>{err}</p>
      <button className="co" style={{ width: "100%" }} onClick={submit}>Join</button>
    </>
  );
}
