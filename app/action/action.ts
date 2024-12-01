"use server";

import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import {
  EventTypeSchema,
  onboardingSchema,
  onboardingSchemaLocale,
  settingSchema,
} from "../lib/zodSchema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { nylas } from "../lib/nylas";

export async function onBoardingAction(prevState: any, formData: FormData) {
  const user = await requireUser();
  const submission = await parseWithZod(formData, {
    schema: onboardingSchema({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            username: formData.get("username") as string,
          },
        });
        return !existingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: user.user?.id,
    },
    data: {
      username: submission.value.username,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            { day: "Monday", fromTime: "08:00", tillTime: "18:00" },
            { day: "Tuesday", fromTime: "08:00", tillTime: "18:00" },
            { day: "Wednesday", fromTime: "08:00", tillTime: "18:00" },
            { day: "Thursday", fromTime: "08:00", tillTime: "18:00" },
            { day: "Friday", fromTime: "08:00", tillTime: "18:00" },
            { day: "Saturday", fromTime: "08:00", tillTime: "18:00" },
            { day: "Sunday", fromTime: "08:00", tillTime: "18:00" },
          ],
        },
      },
    },
  });

  return redirect("/onboarding/grand-id-nylas");
}

export async function settingAction(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: settingSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const user = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.name,
      image: submission.value.image,
    },
  });
  return redirect("/dashboard");
}

export async function updateAvailabilityAction(formData: FormData) {
  const session = await requireUser();

  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");

      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });
    try {
        await prisma.$transaction(
            availabilityData.map((item)=>prisma.availability.update({
                where:{
                    id:item.id
                },
                data:{
                    isActive:item.isActive,
                    fromTime:item.fromTime,
                    tillTime:item.tillTime
                }
            }))
        );
        revalidatePath("/dashboard/availability")
    } catch (error) {
        console.log(error)
    }
}


export async function CraeteEventTypeAction(prevState:any,formData:FormData){
  const session=await requireUser()

  const submission=parseWithZod(formData,{
    schema:EventTypeSchema
  })
  if(submission.status!=="success"){
    return submission.reply();
  }
  await prisma.eventType.create({
    data:{
      title:submission.value.title,
      duration:submission.value.duration,
      url:submission.value.url,
      description:submission.value.description,
      vedioCallSoftware:submission.value.vedioCallSoftware,
      userId:session.user?.id
    }
  })
  return redirect("/dashboard")
}


export async function CreateMeetingACtion(formData:FormData){
   const getUserData= await prisma.user.findUnique({
    where:{
      username:formData.get("username") as string
    },
    select:{
      grantEmail:true,
      grantId:true
    }
   });
   if(!getUserData){
    throw new Error("User not found")
   }
   const eventTypeData=await prisma.eventType.findUnique({
    where:{
      id:formData.get('eventTypeId') as string
    },
    select:{
      title:true,
      description:true
    }
   })

   const fromTime=formData.get('fromTime') as string
   const eventDate=formData.get('eventDate') as string
   const meetingDuration= Number(formData.get('meetingDuration'))
   const provider=formData.get('provider')
   
   const startDateTime= new Date(`${eventDate}T${fromTime}:00`)
   const endDateTime= new Date(startDateTime.getTime() + meetingDuration * 60000)

   await nylas.events.create({
    identifier:getUserData.grantId as string,
    requestBody:{
       title:eventTypeData?.title,
       description:eventTypeData?.description,
       when:{
        startTime:Math.floor(startDateTime.getTime()/1000),
        endTime: Math.floor(endDateTime.getTime()/1000),
       },
       conferencing:{
          autocreate:{},
          provider:provider as any ,
       },
       participants:[
        {
          name:formData.get('name') as string,
          email:formData.get('email') as string,
          status:"yes"
        }
       ]
    },
    queryParams:{
      calendarId:getUserData.grantEmail as string,
      notifyParticipants:true
    }
   })
   return redirect("/success")
}


export async function cancelMeetingAction(formData:FormData){
  const session=await requireUser()
  const userData=await prisma.user.findUnique({
    where:{
      id:session.user?.id
    },
    select:{
      grantEmail:true,
      grantId:true
    }
  });

  if(!userData){
    throw new Error("user not found !")
  }
  const data=await nylas.events.destroy({
    eventId:formData.get("eventId") as string,
    identifier:userData.grantId as string,
    queryParams:{
      calendarId:userData.grantEmail as string
    }
  })
  revalidatePath("/dashboard/meetings")
}


export async function EditEventAction( prevState:any,formData:FormData){
  const session=await requireUser()
  const submission= parseWithZod(formData,{
    schema:EventTypeSchema,
  });
  if(submission.status!=="success"){
    return submission.reply()
  }
  const data=await prisma.eventType.update({
    where:{
      id:formData.get("id") as string,
    userId:session.user?.id
    },
    data:{
      title:submission.value.title,
      duration:submission.value.duration,
      url:submission.value.url,
      description:submission.value.description,
      vedioCallSoftware:submission.value.vedioCallSoftware
    }
  })
  return redirect("/dashboard")
}