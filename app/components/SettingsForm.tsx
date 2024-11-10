"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GeneralSubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { settingAction } from "../action/action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingSchema } from "../lib/zodSchema";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface userdataProps {
  name: string;
  email: string;
  image: string;
}

export function SettingsForm({ name, email, image }: userdataProps) {
  const [lastResult, action] = useFormState(settingAction, undefined);
  const [currentProfileImage,setCurrentProfileImage]=useState(image)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });


  const handleDeleteImage=()=>{
    setCurrentProfileImage("")
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className=" flex flex-col gap-y-4">
          <div className=" flex flex-col gap-y-2">
            <label>Full Name</label>
            <Input
              name={fields.name.name}
              placeholder="Ajit Kumar"
              key={fields.name.key}
              defaultValue={name}
            />
            <p className="text-red-500 text-sm">{fields.name.errors}</p>
          </div>
          <div className=" flex flex-col gap-y-2">
            <label>Email</label>
            <Input
              placeholder="justajit33@gmail.com"
              disabled
              defaultValue={email}
            />
          </div>

          <div className="grid gap-5">
            <Label>Profile Image</Label>
            <input type="hidden" name={fields.image.name} key={fields.image.key} value={currentProfileImage} />
         {currentProfileImage ?(
            <div className=" relative size-16">
           <img src={currentProfileImage} alt="profile" className="size-16 rounded-lg" /> 
           <Button type="button" onClick={handleDeleteImage} variant="destructive" size="icon" className=" absolute -top-3 -right-3">
            <X className="size-4"/>
           </Button>
           </div>
         ):(
           <UploadDropzone onClientUploadComplete={(res)=>{
            setCurrentProfileImage(res[0].url);
            toast.success("profile image uploaded sucessfully !")
           }}
           onUploadError={(error)=>{
             console.log("somthing went wrong while uploading",error)
             toast.error(error.message)
           }}
           endpoint="imageUploader" />
         )}
         <p className="text-red-400 text-sm">{fields.image.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <GeneralSubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
