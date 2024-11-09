"use server"

import prisma from "../lib/db"
import { requireUser } from "../lib/hooks"
import{parseWithZod} from "@conform-to/zod"
import { onboardingSchema, onboardingSchemaLocale, settingSchema } from "../lib/zodSchema"
import { redirect } from "next/navigation"



export async function onBoardingAction(prevState:any,formData:FormData){
    const user= await requireUser()
 const submission=await parseWithZod(formData,{
    schema:onboardingSchema({
        async isUsernameUnique() {
            const existingUsername=await prisma.user.findUnique({
                where:{
                    username:formData.get('username') as string,
                },
            });
            return !existingUsername
        },
    }),
    async:true
 })
    if(submission.status!=="success"){
        return submission.reply()
    }
    const data=await prisma.user.update({
        where:{
            id:user.user?.id
        },
        data:{
            username:submission.value.username,
            name:submission.value.fullName
        }
    })
    return redirect("/onboarding/grand-id-nylas")
}



export async function settingAction(prevState:any ,formData:FormData){
     const session =await requireUser()
     const submission=parseWithZod(formData,{
        schema:settingSchema
     })
     if(submission.status!== "success"){
        return submission.reply();
     }

     const user=await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data:{
            name:submission.value.name,
            image:submission.value.image
        }
     });
     return redirect("/dashboard")
}