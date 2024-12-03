"use client"

import { Switch } from "@/components/ui/switch";
import { useFormState } from "react-dom";
import { UpdateEventTypeStatusAction } from "../action/action";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";


export function MenuActiveSwitcher({initialCheked,eventTypeId}:{
    initialCheked:boolean,
    eventTypeId:string
}){
    const[isPending,startTransition]=useTransition()
    const[state , action]=useActionState(UpdateEventTypeStatusAction,undefined)

    useEffect(()=>{
           if(state?.status=='sucess'){
            toast.success(state.message)
           }
           else if(state?.status=='error'){
            toast.error(state?.message)
           }
    },[state])
    return(
        <Switch disabled={isPending} defaultChecked={initialCheked} onCheckedChange={(isChecked)=>{
            startTransition(()=>{
                action({
                    eventTypeId:eventTypeId,
                    isChecked:isChecked
                })
            })
        }} />
    )
}