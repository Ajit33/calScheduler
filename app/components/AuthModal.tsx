import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import Logo from "@/public/logo (1).png"
import Image from "next/image";



export function AuthModal(){
    return(
        <Dialog>
           <DialogTrigger asChild>
            <Button>Try for free</Button>
            </DialogTrigger> 
            <DialogContent className="sm:max-w-[360px]">
              <DialogHeader>
                <Image  src={Logo} alt="logo" className="size-10" />
                <h4 className="text-3xl font-semibold">Cal<span className="text-blue-500">Scheduler</span></h4>
              </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}