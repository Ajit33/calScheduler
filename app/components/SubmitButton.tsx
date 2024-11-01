"use client"

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return <>{pending ? <Button disabled   variant="outline" className="w-full"><Loader2 className="size-4 mr-2 animate-spin" /> please wait !</Button> : <Button variant="outline" className="w-full"><FcGoogle/> Sign in with Google</Button>}</>;
}

export function GithubAuthButton(){
  const {pending}=useFormStatus()

  return <>{pending? <Button variant="outline" disabled className="w-full"> <Loader2 className="size-4 mr-2 animate-spin"/>please wait !</Button>:<Button variant="outline" className="w-full"><FaGithub /> Sign in with Github</Button>}</>
}
