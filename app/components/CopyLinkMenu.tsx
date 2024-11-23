"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";


export function CopyLinkMenuItem({meetingUrl}:{meetingUrl:string}){

    const handelcopy= async()=>{
      try {
        await navigator.clipboard.writeText(meetingUrl)
        toast.success("URL has been copied")
      } catch (error) {
        console.log(error)
        toast.error("Couldn't able to copy the URL")
      }  
    }

    return(
        <DropdownMenuItem onSelect={handelcopy}>
           <Link2 className="mr-2 size-4" />
           copy 
        </DropdownMenuItem>
    )
}