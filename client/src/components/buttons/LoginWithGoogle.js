"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";
export default function LoginWithGoogle() {
  return (
    <div>
      <button
        onClick={() => signIn("google")}
        className="flex gap-3 items-center justify-center bg-white shadow text-center w-full py-4"
      >
        <FontAwesomeIcon className="h-6" icon={faGoogle} />
        <span>Sign In with Google</span>
      </button>
    </div>
  );
}
