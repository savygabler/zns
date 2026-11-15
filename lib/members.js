// Demo members list, saved in the visitor's browser only.
// Replace with real customer accounts (Shopify, Supabase, etc.) before relying on it.

const SEED = [{ email: "demo@zns.test", username: "zoe", code: "ZNS-DEMO-0001" }];

const read = () => {
  try {
    return JSON.parse(localStorage.getItem("zns_members") || "[]");
  } catch {
    return [];
  }
};
const write = (v) => {
  try {
    localStorage.setItem("zns_members", JSON.stringify(v));
  } catch {}
};
const all = () => SEED.concat(read());

export function currentMember() {
  try {
    return sessionStorage.getItem("zns_in");
  } catch {
    return null;
  }
}
function signIn(u) {
  try {
    sessionStorage.setItem("zns_in", u);
  } catch {}
}

export function enter(value) {
  const v = value.trim().toLowerCase();
  const m = all().find((x) => x.username.toLowerCase() === v || x.code.toLowerCase() === v);
  if (!v || !m) return null;
  signIn(m.username);
  return m.username;
}

export function join(email, username) {
  const e = email.trim(), u = username.trim();
  if (!/^\S+@\S+\.\S+$/.test(e)) return { error: "Please enter a valid email." };
  if (!/^\w{3,16}$/.test(u)) return { error: "Username: 3 to 16 letters, numbers or _." };
  if (all().some((x) => x.username.toLowerCase() === u.toLowerCase())) return { error: "That username is taken. Try another." };
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const r = (n) => Array.from({ length: n }, () => A[Math.floor(Math.random() * A.length)]).join("");
  const code = `ZNS-${r(4)}-${r(4)}`;
  write(read().concat({ email: e, username: u, code }));
  signIn(u);
  return { username: u, code };
}
