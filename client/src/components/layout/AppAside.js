"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

export default function AppSidebar() {
  const path = usePathname();
  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-gray-500">
      <Link
        className={
          "flex gap-4 p-2 " +
          (path === "/account" ? "text-green-500" : "")
        }
        href={"/account"}
      >
        <FontAwesomeIcon className="w-6 h-6" icon={faFileLines} />
        <span>My Page</span>
      </Link>
      <Link
        className={
          "flex gap-4 p-2 " +
          (path === "/analytics" ? "text-green-500" : "")
        }
        href={"/analytics"}
      >
        <FontAwesomeIcon className="w-6 h-6" icon={faChartLine} />
        <span>Analytics</span>
      </Link>
      <LogoutButton
        iconLeft={true}
        className={"flex gap-4 p-2 items-center"}
        iconClasses={"w-6 h-6"}
      />
      <Link
        className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4"
        href={"/"}
      >
        <FontAwesomeIcon className="w-3 h-3" icon={faArrowLeft} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}
