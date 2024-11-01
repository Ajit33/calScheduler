
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTrigger,DialogContent, DialogTitle  } from "@/components/ui/dialog";
import Logo from "@/public/logo (1).png"
import Image from "next/image";
import { signIn } from "../lib/auth";
import {FcGoogle} from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButton";


export function AuthModal(){
    return(
        <Dialog>
           <DialogTrigger asChild>
            <Button>Try for free</Button>
            </DialogTrigger> 
            <DialogContent className="sm:max-w-[360px]">
              <DialogHeader className="flex flex-row justify-center items-center gap-2">
                <Image  src={Logo} alt="logo" className="size-10" />
                <h4 className="text-3xl font-semibold">Cal<span className="text-orange-500">Scheduler</span></h4>
              </DialogHeader>
              <div className="gap-3 mt-5  flex flex-col">
                <form className="w-full" action={async()=>{
                  "use server"
                  await signIn("google")
                }} >
               <GoogleAuthButton />
              </form>
              <form className="w-full" action={async ()=>{
                "use server"
                await signIn("github")
              }}>
              <GithubAuthButton />
              </form>
              </div>
            </DialogContent>
        </Dialog>
    )
}