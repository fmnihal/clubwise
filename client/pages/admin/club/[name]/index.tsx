import ClubSideBarAdmin from "@/components/ClubSideBarAdmin";
import { clubs } from "@/libs/clubs";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function ClubName() {
    const router = useRouter();
    const [clubInfo, setClubInfo] = useState(null as any);
    const { name } = router.query;

    useEffect(() => {
        if(!name) return;
        setClubInfo(clubs.find(club => club.name.toLowerCase() == (name as string)?.toLowerCase()));
    }, [name])
  return (
    <div className="flex gap-4 min-h-screen">
      <ClubSideBarAdmin />
      <div>
        {
            clubInfo === null ? <div>Loading...</div>
            :
            <>
                <h1 className="text-2xl font-bold py-4">{clubInfo.fullName}</h1>
            </>
        }
      </div>
    </div>
  )
}
