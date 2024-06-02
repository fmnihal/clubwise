import ClubSideBarAdmin from "@/components/ClubSideBarAdmin"

export default function PendingApproval() {
    return (
        <div className="flex gap-4 min-h-screen">
            <ClubSideBarAdmin/>
            <div>
                <h1 className="text-2xl py-4 font-bold">Pending Approval</h1>
                <div>
                    <p className="text-gray-500">No pending approval</p>
                </div>
            </div>
        </div>
    )
}
