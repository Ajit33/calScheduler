"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


interface GrenralButtonSubmitProps{
  text:string
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  className?:string
}


export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return <>{pending ? <Button disabled   variant="outline" className="w-full"><Loader2 className="size-4 mr-2 animate-spin" /> please wait !</Button> : <Button variant="outline" className="w-full"><FcGoogle/> Sign in with Google</Button>}</>;
}

export function GithubAuthButton(){
  const {pending}=useFormStatus()

  return <>{pending? <Button variant="outline" disabled className="w-full"> <Loader2 className="size-4 mr-2 animate-spin"/>please wait !</Button>:<Button variant="outline" className="w-full"><FaGithub /> Sign in with Github</Button>}</>
}

export function GeneralSubmitButton({text,variant,className}:GrenralButtonSubmitProps){
  const {pending}=useFormStatus()

  return<>
  {pending? <Button variant="outline" disabled className={cn(
        "w-fit",className
  )}> <Loader2 className="size-4 mr-2 animate-spin"/>please wait !</Button>:<Button variant={variant} className={cn(
        "w-fit",className
  )}type="submit">{text}</Button>}
  </>
}
