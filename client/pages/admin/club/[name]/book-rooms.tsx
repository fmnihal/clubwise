import ClubSideBarAdmin from "@/components/ClubSideBarAdmin"
import { clubs } from "@/libs/clubs";
import { serverURL } from "@/libs/const";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

export default function BookRooms() {
    const router = useRouter();
    const [clubInfo, setClubInfo] = useState(null as any);
    const { name } = router.query;
    const [date, setDate] = useState(new Date());
    const [showForm, setShowForm] = useState(false);
    const [rooms, setRooms] = useState("");

    useEffect(() => {
        if(!name) return;
        setClubInfo(clubs.find(club => club.name.toLowerCase() == (name as string)?.toLowerCase()));
    }, [name])

    useEffect(() => {
        fetch(`${serverURL}/v1/api/club/book-rooms?club=${clubInfo?.name}&date=${date.toDateString()}`, {credentials: "include"})
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setRooms(data.room?.description);
        })
        .catch(err => console.log(err));
    }, [date]);

    function onClickDay(value: Date) {
        setDate(value);
        setShowForm(true);
        console.log(value);
    }

    function bookRoom(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const body = Object.fromEntries(formData.entries());
        console.log(body)
        fetch(`${serverURL}/v1/api/club/book-rooms`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify({...body, club: clubInfo?.name, date: date.toDateString()}),
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) alert(data.message);
            else {
                alert("Room has been booked successfully");
                setShowForm(false);
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <div className="flex gap-4 min-h-screen">
            <ClubSideBarAdmin/>
            <div>
                <h1 className="text-2xl py-4 font-bold">{clubInfo?.fullName}</h1>
                <h2 className="text-xl py-4 font-bold">Book Room</h2>
                <div>
                    <p className="text-gray-500"></p>
                    <Calendar onClickDay={onClickDay}/>
                </div>
            </div>
            {
                showForm && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black" onClick={()=>setShowForm(false)}/>
                        <form onSubmit={bookRoom} className="z-10 max-w-4xl w-full rounded-md p-4 bg-white">
                            <h1 className="text-2xl font-bold mb-6">Book Room on {date.toDateString()}</h1>
                            <textarea value={rooms} onChange={(e) => setRooms(e.target.value)} className="w-full min-h-32 rounded-md shadow p-4" name="description" id="room" placeholder="Describe Room no., reason..."></textarea>
                            <button className="bg-purple-500 rounded-md px-4 py-2 text-white">Save</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
