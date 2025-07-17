import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faSearch } from "@fortawesome/free-solid-svg-icons";
import  HandleHeaderSearch  from "@/components/HandleHeaderSearch";
export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white border-b  py-4">
      <div className="px-6 max-w-7xl flex justify-between mx-auto">
        <div className="flex items-center gap-6 ">
          
          <Link className="flex items-center gap-1 text-green-700" href={"/"}>
            <FontAwesomeIcon className="text-green-600" icon= {faLink}/>
            <span className="font-bold">Linktree</span>
            </Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Pricing</Link>
            <Link href={"/"}>Contact</Link>
          </nav>
        </div>
        <HandleHeaderSearch/>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          {!!session && (
            <>
            <Link href={'/account'}>Hello, {session?.user?.name}</Link>
            <LogoutButton/>
            </>
          )}
          {!session && (
            <>
              <Link href={"/login"}>Sign In</Link>
              <Link href={"/login"}>Create Account</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
