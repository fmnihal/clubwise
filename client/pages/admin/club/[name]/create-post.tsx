import ClubSideBarAdmin from "@/components/ClubSideBarAdmin";
import Sidebar from "@/components/Sidebar";
import { clubs } from "@/libs/clubs";
import { serverURL } from "@/libs/const";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, use, useEffect, useRef, useState } from "react";

export default function CreatePost() {
  const router = useRouter();
  const { name } = router.query;
  const [clubInfo, setClubInfo] = useState(null as any);
  const formRef = useRef<HTMLFormElement>({} as HTMLFormElement);

  useEffect(() => {
    setClubInfo(clubs.find(club => club.name.toLowerCase() == (name as string).toLowerCase()));
  }, [name])

  async function privatePublish(e: MouseEvent) {
    const formData = new FormData(formRef.current);
    console.log(clubInfo)
    formData.append("club", clubInfo?.name);
    formData.append("isPublic", "false");
    const res = await axios.request({
      method: "post",
      url: serverURL + "/v1/api/club/post",
      data: formData,
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.error) alert(res.data.message);
    else router.push(`/admin/club/${clubInfo?.href}`);
    alert("Post Published")
  }

  async function publicPublish(e: MouseEvent) {
    const formData = new FormData(formRef.current);
    console.log(clubInfo)
    formData.append("club", clubInfo?.name);
    formData.append("isPublic", "true");
    const res = await axios.request({
      method: "post",
      url: serverURL + "/v1/api/club/post",
      data: formData,
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.error) alert(res.data.message);
    else router.push(`/admin/club/${clubInfo?.href}`);
    alert("Post Published")
  }
  return (
    <div className="flex gap-4 min-h-screen">
      <ClubSideBarAdmin />
      {
        clubInfo === null ? <div>Loading...</div> :
          <div>
            <h1 className="text-2xl font-semibold py-4">{clubInfo?.fullName}</h1>
            <div className="py-6 mx-auto w-full">
              <h1 className="text-xl">Publish a Post</h1>
              <form ref={formRef}>
                <input type="text" className="w-full my-4 py-2 px-4 rounded-md shadow bg-black bg-opacity-10" name="title" id="title" placeholder="Title" />
                <textarea className="min-h-20 w-full my-4 py-2 px-4 rounded-md shadow bg-black bg-opacity-10" name="shortDescription" id="description" placeholder="Short description" />
                <textarea className="min-h-40 w-full my-4 py-2 px-4 rounded-md shadow bg-black bg-opacity-10" name="longDescription" id="description" placeholder="Long description" />
                <div className="py-4">
                  <p className="font-semibold">Upload a picture</p>
                  <input type="file" name="file" id="picture" />
                </div>
                <div className="flex justify-between items-center gap-4">
                  <button onClick={privatePublish} type="button" className="px-6 py-2 bg-purple-600 text-white font-semibold my-4 rounded-md">Publish (Private)</button>
                  <button onClick={publicPublish} type="button" className="px-6 py-2 bg-purple-600 text-white font-semibold my-4 rounded-md">Publish (Public)</button>
                </div>
              </form>
            </div>
          </div>
      }
    </div>
  )
}
