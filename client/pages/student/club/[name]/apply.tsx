import ClubSideBarStudent from "@/components/ClubSideBarStudent";
import { clubs } from "@/libs/clubs";
import { serverURL } from "@/libs/const";
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react";

export default function Apply() {
    const router = useRouter();
    const [clubInfo, setClubInfo] = useState(null as any);
    const { name } = router.query;

    useEffect(() => {
        if(!name) return;
        setClubInfo(clubs.find(club => club.name.toLowerCase() == (name as string)?.toLowerCase()));
    }, [name])

    function apply(e:FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const body = Object.fromEntries(formData.entries());
        fetch(`${serverURL}/v1/api/club/application`, {
            method: "post",
            credentials: "include",
            body: JSON.stringify({...body, club: clubInfo?.name}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) alert(data.message);
            else {
                alert("Application Submitted Successfully");
                router.push(`/student/club/${clubInfo?.name}`);
            }
        })
        .catch(err => console.log(err));
    }
    return (
    <div className="flex gap-4 min-h-screen">
      <ClubSideBarStudent />
      <div>
        {
            clubInfo === null ? <div>Loading...</div>
            :
            <>
                <h1 className="text-2xl font-bold py-4">Apply for{clubInfo.fullName}</h1>
                <div className="py-6">
                    <form onSubmit={apply} className="grid md:grid-cols-2 gap-4 px-4">
                        <div>
                            <input type="text" name="fullName" placeholder="Full Name" className="w-full rounded-md shadow p-2 bg-black bg-opacity-10 my-2" />
                            <input type="text" name="studentId" placeholder="Student ID" className="w-full rounded-md shadow p-2 bg-black bg-opacity-10 my-2" />
                            <input type="text" name="department" placeholder="Department" className="w-full rounded-md shadow p-2 bg-black bg-opacity-10 my-2" />
                            <input type="text" name="programme" placeholder="Programme" className="w-full rounded-md shadow p-2 bg-black bg-opacity-10 my-2" />
                            <input type="text" name="batch" placeholder="Batch" className="w-full rounded-md shadow p-2 bg-black bg-opacity-10 my-2" />
                        </div>
                        <div>
                            <input type="tel" name="contact" placeholder="Contact Number" className="w-full rounded-md shadow p-2 bg-black bg-opacity-10 my-2" />
                            <textarea name="previousWorkingExperience" placeholder="Previous Working Experience" className="w-full rounded-md shadow p-2 bg-black bg-opacity-10 my-2" />
                            <textarea name="comment" placeholder="Comment" className="w-full rounded-md shadow p-2 bg-black bg-opacity-10 my-2" />
                            <button type="submit" className="w-full bg-purple-600 text-white rounded-md shadow p-2">Apply</button>
                        </div>
                    </form>
                </div>
            </>
        }
      </div>
    </div>
  )
}
