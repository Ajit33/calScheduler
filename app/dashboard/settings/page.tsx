import { SettingsForm } from "@/app/components/SettingsForm";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";


async function getUserData(id:string){
    const data=await prisma.user.findUnique({
     where:{
         id:id,
     },
     select:{
         name:true,
         email:true,
         image:true
     }
    })
    if(!data){
     return notFound()
    }
    return data;
 }

export default async function Settings(){
    const session=await requireUser()

   const data=await getUserData(session.user?.id as string)
   return (
    <div>
        <SettingsForm email={data.email} name={data.name as string} image={data.image as string} />
    </div>
   ) 
}