import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import vedioGif from "@/public/work-is-almost-over-happy.gif"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";

export default function nylasOnBorading(){
    return(
        <div className="min-h-screen w-screen flex items-center justify-center">
             <Card>
               <CardHeader>
                <CardTitle>You are almost Done</CardTitle>
                <CardDescription>Lets connect the Calendar to your calScheduler  account</CardDescription>
                <Image src={vedioGif} alt="vedio" className="w-full rounded-lg"/>
                </CardHeader> 
                <CardContent>
                    <Button asChild>
                        <Link href="/api/auth" className="w-full">
                        <CalendarCheck2 className="size-4 mr-2" />
                        Connect Calendar to calScheduler
                        </Link>
                    </Button>
                </CardContent>
             </Card>
        </div>
    )
}