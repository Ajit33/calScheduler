import { notFound, redirect } from "next/navigation"
import { auth } from "../lib/auth"
import { requireUser } from "../lib/hooks"
import prisma from "../lib/db"
import { EmptyState } from "../components/EmptyState"


async function getData(userId:string) {
    const data=await prisma.user.findUnique({
        where:{
         id:userId
        },
        select:{
            username:true,
            eventType:{
                select:{
                    id:true,
                    active:true,
                    title:true,
                    url:true,
                    duration:true
                }
            }
        }
    })
    if(!data){
        return notFound()
    }
    return data
}


export default async function DashboardPage(){
   
    const session=await requireUser()
    const data=await getData(session.user?.id as string)
    return (
        <>
        {data.eventType.length===0 ?(<EmptyState title="You Doesn't have any event" description="Create your frist event just by click the button below" buttontext="Create Event" href="/dashboard/createEvent"/>):(<p>we found some events</p>)}
        </>
    )
}