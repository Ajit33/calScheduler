import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        username: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      vedioCallSoftware: true,
      User: {
        select: {
          username: true,
          image: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
  if(!data){
    return notFound()
  }
  return data;
}

export default  async function BookingFormRoute({params}:{params:{username: string,eventUrl: string}}) {

    const data= await getData(params.eventUrl,params.username)
    // const image=await data.User?.image
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[1000px] w-full mx-auto">
        <CardContent className="p-5 md:gird md:grid-cols-[1fr,auto,1fr,auto,1fr]">
          <div>
            <img src={data.User?.image as string} alt="Profile image of user" className="size-9 rounded-full" />
            <p className="text-sm font-medium text-foreground mt-1">{data.User?.username}</p>
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
            <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                    <CalendarX2  className="text-primary siz-4 mr-2"/>
                    <span className=" text-sm font-medium text-muted-foreground">23. sept 2024</span>
                </p>
                <p className="flex items-center">
                    <Clock  className="text-primary siz-4 mr-2"/>
                    <span className=" text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                </p>
                <p className="flex items-center">
                    <VideoIcon className="text-primary siz-4 mr-2"/>
                    <span className=" text-sm font-medium text-muted-foreground">{data.vedioCallSoftware}</span>
                </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
