import { cancelMeetingAction } from "@/app/action/action";
import { EmptyState } from "@/app/components/EmptyState";
import { GeneralSubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db"
import { requireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { VideoIcon } from "lucide-react";



async function getMeetings(userId:string){
    const UserData=await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            grantId:true,
            grantEmail:true
        }
    })
    if(!UserData){
        throw new Error('User not found !')
    }
    const data=await nylas.events.list({
        identifier:UserData.grantId as string,
          queryParams:{
            calendarId:UserData.grantEmail as string
          }
    });
   
    return data;
}



export default async function MeetingsRoute(){  
    const session=await requireUser()
   const meetings=await getMeetings(session.user?.id as string)
   console.log(meetings)
    return(
     <>
     {meetings.data.length < 1 ?(
       <EmptyState title="No meeting found" description="You don't have any meetings " buttontext="Create one" href="/dashboard/createEvent" />
     ):(
        <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>  
              <CardDescription>See the Upcoming Meetings which were booked with you.</CardDescription>
            </CardHeader>
            <CardContent>
                {meetings.data.map((items)=>(
                 <form action={cancelMeetingAction}>
                    <input type="hidden" name="eventId" value={items.id} />
                      <div className="grid grid-cols-3 justify-between items-center ">
                        <div >
                            <p className="text-muted-foreground text-sm">{format(fromUnixTime(items.when.startTime),"EEE, dd MMM")}</p>
                            <p>
                                {format(fromUnixTime(items.when.startTime),"hh:mm a")}-{format(fromUnixTime(items.when.endTime), "hh:mm a")}
                            </p>
                            <div className=" flex items-center mt-1">
                                <VideoIcon className="size-4 mr-2 text-primary" />
                        
                                <a  className="text-xs text-primary underline underline-offset-4" href={items.conferencing.details.url} target="_blank">Join metting</a>
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <h2 className="text-sm font-medium">{items.title}</h2>
                            <p className="text-sm text-muted-foreground">You and {items.participants[0].name}</p>
                        </div>
                        <GeneralSubmitButton text="Cancel Event" variant="destructive"  className="w-fit flex ml-auto"/>
                     
                   </div>
                   <Separator className="my-4" />
                 </form>
                ))}
            </CardContent>
        </Card>
     )}
     </>
    )
}