"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { onBoardingAction } from "../action/action";
import {useForm} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemaLocale } from "../lib/zodSchema";
import { GeneralSubmitButton } from "../components/SubmitButton";
export default function OnboardingRoute(){
  const[lastResult,action]=useFormState(onBoardingAction,undefined)

  const [form,fields]=useForm({
    lastResult,
    onValidate({formData}){
      return parseWithZod(formData,{
        schema:onboardingSchemaLocale
      })
    },
    shouldValidate:'onBlur',
    shouldRevalidate:'onInput'
  })
  return(
    <div className="min-h-screen w-screen flex items-center justify-center">
       <Card>
        <CardHeader>
          <CardTitle>Welcome to Calscheduler</CardTitle>
          <CardDescription>
            We need these following information to set up your Profile !
          </CardDescription>
        </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <CardContent className="grid gap-y-5">
              <div className="grid gap-y-2">
              <Label>FullName</Label>
              <Input name={fields.fullName.name} defaultValue={fields.fullName.initialValue} key={fields.fullName.key}  placeholder="ex:-Ajit Kumar Pardhan"   />
              <p className="text-sm text-red-500">{fields.fullName.errors}</p>
              </div>
              <div className="grid gap-y-2">
                <Label>Username</Label>
                <div className="flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">Calscheduler.com</span>
                  <Input placeholder="ex:- user1" className="rounded-l-none"  name={fields.username.name} key={fields.username.key} defaultValue={fields.username.initialValue}/>
                  <p className="text-sm text-red-500">{fields.username.errors}</p>
                </div>

              </div>
        </CardContent>
        <CardFooter>
         <GeneralSubmitButton variant="default" text="Create" className="w-full" />
        </CardFooter>
      </form>
       </Card>
    </div>
  )
}

