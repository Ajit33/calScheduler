import { redirect } from "next/navigation"
import { auth } from "../lib/auth"
import { requireUser } from "../lib/hooks"

export default async function DashboardPage(){
   
    const session=await requireUser()
    return (
        <div>
            Hello from dashboard
        </div>
    )
}