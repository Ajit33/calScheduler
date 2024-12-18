import { notFound, redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { requireUser } from "../lib/hooks";
import prisma from "../lib/db";
import { EmptyState } from "../components/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link2, Pen, Settings, Trash, User2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {DropdownMenuLabel, DropdownMenu,DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CopyLinkMenuItem } from "../components/CopyLinkMenu";
import { MenuActiveSwitcher } from "../components/EventTypeSwitcher";



async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="You Doesn't have any event"
          description="Create your frist event just by click the button below"
          buttontext="Create Event"
          href="/dashboard/createEvent"
        />
      ) : (
      <>
      <div className="flex items-center justify-between  px-2 ">
              <div className="hidden sm:grid gap-y-1">
                <h1 className="text-3xl md:text-4xl font-semibold">Event Types</h1>
                <p className="text-muted-foreground">Create and Mannage your Events.</p>
              </div>
              <Button asChild>
                <Link href="/dashboard/createEvent">Create New Event</Link>
              </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {data.eventType.map((item)=>(
            <div key={item.id} className="overflow-hidden shadow rounded-lg border relative">
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Settings className="size-4"  />
                            </Button>    
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Event</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href={`/${data.username}/${item.url}`}>
                                <ExternalLink className="mr-2 size-4" />
                                Preview</Link>
                            </DropdownMenuItem>
                            <CopyLinkMenuItem meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.username}/${item.url}`} />
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/event/${item.id}`}>
                                <Pen className="mr-2 size-4" />
                               Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/event/${item.id}/delete`}>
                                <Trash className="size-4 mr-2" />
                                Delete
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href="/" className="flex items-center p-5">
                <div className="flex-shrink-0">
                    <User2 className="size-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-muted-foreground">
                            {item.duration} Minutes Meeting
                        </dt>
                        <dd className="font-medium text-lg">{item.title}</dd>
                    </dl>
                </div>

                </Link>
                <div className="bg-gray-300 px-5 py-3 justify-between items-center flex">
                   <MenuActiveSwitcher initialCheked={item.active} eventTypeId={item.id} />
                   <Button asChild>
                    <Link href={`/dashboard/event/${item.id}`}>Edit Event</Link> 
                   </Button>
                </div>
            </div>
        ))}
      </div>
      </>

      )}
    </>
  );
}
