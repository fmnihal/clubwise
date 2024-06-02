import { clubAdminFeatures } from "@/libs/clubs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ClubSideBarAdmin() {
    const router = useRouter(); 
    const { name } = router.query;

  return (
    <div className="p-4 bg-purple-500 min-h-screen">
        <Link href={"/admin"}>
            <Image src="/logo.svg" alt="Logo" width={200} height={200} className="mb-6" />
        </Link>
        <div>
            {
                clubAdminFeatures.map(club => (
                    <Link className="text-center block" href={`/admin/club/${name}/${club.href}`} key={club.name}>
                        <span className="block py-2 px-4 bg-gray-200 rounded-lg my-2">{club.name}</span>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}
