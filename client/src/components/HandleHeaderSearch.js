"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Search from "./Search";
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";

export default function handleSearch() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    function handleInput(e){
        setSearch(e.target.value)
    }

    async function dide(){
       const sonuc = await Search(search);
       if(sonuc){
           router.push("/"+search);
       }else{
        toast.error("Page could not found!");
       }
    }

  return (
    <div className="flex items-center bg-gray-200">
      <input
        className="bg-gray-100 w-full h-full p-2"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInput(e)}
      />
      <button onClick={ dide } type="button">
        <FontAwesomeIcon
          size="xl"
          className="p-4 text-gray-400"
          icon={faSearch}
        />
      </button>
    </div>
  );
}
