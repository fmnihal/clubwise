import { serverURL } from "@/libs/const";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function AdminLogin() {
    const router = useRouter();

    const login = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try {
            const res = await axios.post(`${serverURL}/v1/api/auth/login`, { email, password }, { withCredentials: true });
            if (res.data.error) alert(res.data.message);
            else router.push("/admin");
        } catch (error) {
            if (axios.isAxiosError(error)) alert(error.response?.data.message);
            else alert("Unexpected error occured. Please try again later.");
        }
    }

        return (
            <div className="min-h-screen justify-center items-center flex">
                <div className="rounded-md shadow p-4 max-w-xl w-full">
                    <h1 className="text-2xl font-semibold text-center">Login as Admin</h1>
                    <form className="mt-4" onSubmit={login}>
                        <div className="mb-4">
                            <label htmlFor="email" className="w-full block text-sm font-medium text-gray-700">Email</label>
                            <input type="text" name="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="w-full block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded-md">Login</button>
                    </form>
                </div>
            </div>
        )
    }
