"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroForm({ user }) {
    const router = useRouter();
  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);
  const [username, setUsername] = useState("");
  async function handleSubmit(ev) {
    ev.preventDefault();
    if (username.length > 0) {
      if (user) {
        router.push("/account?desiredUsername=" + username);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg shadow-gray-700/20"
    >
      <span className="bg-white py-4 pl-4">linktree.ee/</span>
      <input
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        className="py-4"
        type="text"
        placeholder="username"
      />
      <button className="bg-blue-500 text-white py-4 px-6" type="submit">
        Join for Free
      </button>
    </form>
  );
}
