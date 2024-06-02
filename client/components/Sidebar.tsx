import { clubs } from "@/libs/clubs";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({type}:{ type: "admin" | "student" }) {
  return (
    <div className="p-4 bg-purple-500 min-h-screen">
        <Link href={type == "admin" ? "/admin" : "/student"}>
           <Image src="/logo.svg" alt="Logo" width={200} height={200} className="mb-6" />
        </Link>
        <div>
            {
                clubs.map(club => (
                    <Link className="text-center block" href={`/${type}/club/${club.href}`} key={club.name}>
                        <span className="block py-2 px-4 bg-gray-200 rounded-lg my-2">{club.name}</span>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}
