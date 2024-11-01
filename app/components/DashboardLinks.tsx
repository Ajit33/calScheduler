"use client"


import { cn } from "@/lib/utils";
import { CalendarCheck, HomeIcon, LucideProps, Settings, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";


interface DashboardLinksProps{
    id:number;
    name:string;
    href:string;
    icon:ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}
export const DashboardLinkContent:DashboardLinksProps[]=[
    {
        id:0,
        name:"Event Types",
        href:"/dashboard",
        icon: HomeIcon
    },
    {
        id:1,
        name:"Meetings",
        href:"/dashboard/meetings",
        icon:User2    ,
    },
    {
        id:2,
        name:"Availability",
        href:"/dahboard/availability",
        icon:CalendarCheck
    },
    {
        id:3,
        name:"Settings",
        href:"/dashboard/settings",
        icon:Settings
    }
]

export function DashboardLinks(){
    const pathname=usePathname()
   return(
    <>
    {
        DashboardLinkContent.map((link)=>(
           <Link key={link.id} className={cn(
            pathname===link.href? 'text-primary bg-primary/10':'text-muted-foreground hover:text-muted-foreground',"flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary" 
           )} href={link.href} >
            <link.icon className="size-4" />
            {link.name}
           </Link> 
        ))
    }
   </>
   )
}