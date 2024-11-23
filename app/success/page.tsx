import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import Link from "next/link";


export default function SucessRoute(){
    return(
        <div className="h-screen w-screen flex items-center justify-center">
           <Card className="max-w-[400px] w-full mx-auto">
                <CardContent className="p-6 flex flex-col w-full items-center">
                 <div className="size-16 bg-green-500/10 rounded-full flex items-center justify-center">
                 <CheckIcon className="size-8 text-green-500" />
                 </div>
                 <h1 className="text- font-semibold mt-4">This event is Scheduled sucessfully</h1>
                 <p className="text-sm text-muted-foreground text-center">Check Your email for the Details with vedio call link</p>
                </CardContent>  
                <CardFooter>
                    <Button className="w-full"  asChild>
                        <Link href="/dashboard">Close</Link>
                    </Button>
                </CardFooter>
           </Card>
        </div>
    )
}