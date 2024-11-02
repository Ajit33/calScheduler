"use server"

import prisma from "../lib/db"
import { requireUser } from "../lib/hooks"
import{parseWithZod} from "@conform-to/zod"
import { onboardingSchema, onboardingSchemaLocale } from "../lib/zodSchema"



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
}