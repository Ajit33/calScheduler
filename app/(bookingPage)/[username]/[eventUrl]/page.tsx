import { CreateMeetingACtion } from "@/app/action/action";
import { Calendar } from "@/app/components/bookingForm/Calendar";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import { TimeTable } from "@/app/components/bookingForm/Timetable";
import { GeneralSubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
        availability:{
          select: {
            day: true,
            isActive: true,
          },
        }
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params:Promise< { username: string; eventUrl: string }>;
  searchParams:Promise<{date?:string; time?:string}>
}) {

  const {username}=await params
  const {eventUrl}=await params
  const data = await getData(eventUrl, username);
  const {date}=await searchParams
  const {time}=await searchParams
  const selectedDate= date? new Date(date):new Date()

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(selectedDate);

  const showForm= !!date && !!time;
  
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
      <Card className="max-w-[600px] w-full ">
      <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] gap-4">
        <div>
          <img
            src={data.User?.image ?? "/default-avatar.png"}
            alt={`Profile image of ${data.User?.username ?? "user"}`}
            className="h-9 w-9 rounded-full"
          />
          <p className="text-sm font-medium text-foreground mt-1">
            {data.User?.username}
          </p>
          <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
          <p className="text-sm font-medium text-muted-foreground">
            {data.description}
          </p>
          <div className="mt-5 flex flex-col gap-y-3">
            <p className="flex items-center">
              <CalendarX2 className="text-primary h-4 w-4 mr-2" />
              <span className="text-sm font-medium text-muted-foreground">
               {formattedDate}
              </span>
            </p>
            <p className="flex items-center">
              <Clock className="text-primary h-4 w-4 mr-2" />
              <span className="text-sm font-medium text-muted-foreground">
                {data.duration} Minutes
              </span>
            </p>
            <p className="flex items-center">
              <VideoIcon className="text-primary h-4 w-4 mr-2" />
              <span className="text-sm font-medium text-muted-foreground">
                {data.vedioCallSoftware}
              </span>
            </p>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="h-full w-[1px] bg-orange-700"
        />
        <form className="flex flex-col gap-y-4" action={CreateMeetingACtion}>
          <input type="hidden" name="fromTime" value={time} />
          <input type="hidden" name="eventDate" value={date} />
          <input type="hidden" name="meetingDuration" value={data.duration} />
          <input type="hidden" name="provider" value={data.vedioCallSoftware} />
          <input type="hidden" name="username" value={username} />
          <input type="hidden" name="eventTypeId" value={data.id} />
          <div className="flex flex-col gap-y-2">
            <Label>Your Name</Label>
             <Input name="name" placeholder="Enter Your Name" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Your Email</Label>
             <Input name="email" placeholder="justajit33@gmail.com" />
          </div>
          <GeneralSubmitButton className="w-full mt-5" text="Book Meeting" />
        </form>
      </CardContent>
    </Card>
      ):(<Card className="max-w-[1000px] w-full mx-auto">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
          <div>
            <img
              src={data.User?.image ?? "/default-avatar.png"}
              alt={`Profile image of ${data.User?.username ?? "user"}`}
              className="h-9 w-9 rounded-full"
            />
            <p className="text-sm font-medium text-foreground mt-1">
              {data.User?.username}
            </p>
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">
              {data.description}
            </p>
            <div className="mt-5 flex flex-col gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="text-primary h-4 w-4 mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                 {formattedDate}
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="text-primary h-4 w-4 mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>
              <p className="flex items-center">
                <VideoIcon className="text-primary h-4 w-4 mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.vedioCallSoftware}
                </span>
              </p>
            </div>
          </div>
          <Separator
            orientation="vertical"
            className="h-full w-[1px] bg-orange-700"
          />
          <RenderCalendar availability={data.User?.availability as any} />
          <Separator
            orientation="vertical"
            className="h-full w-[1px] bg-orange-700"
          /> 
          <TimeTable  selectedDate={selectedDate} userName={username} duration={data.duration}/>
        </CardContent>
      </Card>)} 
    </div>
  );
}
