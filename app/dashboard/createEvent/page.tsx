"use client";

import { CraeteEventTypeAction } from "@/app/action/action";
import { GeneralSubmitButton } from "@/app/components/SubmitButton";
import { EventTypeSchema } from "@/app/lib/zodSchema";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useState, useEffect, useActionState } from "react";


type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function CreateEvent() {
  const [mounted, setMounted] = useState(false);
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>("Google Meet");
  const [lastResult, action] = useActionState(CraeteEventTypeAction, undefined);
  const [isLoading,setIsLoading]=useState(false)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: EventTypeSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new Event</CardTitle>
          <CardDescription>
            Create new Event that allows people to book you
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                placeholder="30 Minute Meeting"
              />
              {fields.title.errors && (
                <p className="text-sm text-red-500">{fields.title.errors}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Event link</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  calScheduler.com/
                </span>
                <Input
                  name={fields.url.name}
                  key={fields.url.key}
                  defaultValue={fields.url.initialValue}
                  className="rounded-l-none"
                  placeholder="example-url-1"
                />
              </div>
              {fields.url.errors && (
                <p className="text-sm text-red-500">{fields.url.errors}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
                placeholder="Explain the purpose of this Event..."
              />
              {fields.description.errors && (
                <p className="text-sm text-red-500">{fields.description.errors}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                defaultValue={fields.duration.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">60 Mins</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fields.duration.errors && (
                <p className="text-sm text-red-500">{fields.duration.errors}</p>
              )}
            </div>
            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <input
                type="hidden"
                name={fields.vedioCallSoftware.name}
                value={activePlatform}
              />
              <ButtonGroup>
                <Button
                  type="button"
                  variant={
                    activePlatform === "Zoom Meeting" ? "default" : "secondary"
                  }
                  onClick={() => {
                    setActivePlatform("Zoom Meeting");
                  }}
                  className="w-full"
                >
                  Zoom Meeting
                </Button>
                <Button
                  type="button"
                  variant={
                    activePlatform === "Google Meet" ? "default" : "secondary"
                  }
                  onClick={() => {
                    setActivePlatform("Google Meet");
                  }}
                  className="w-full"
                >
                  Google Meet
                </Button>
                <Button
                  type="button"
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    setActivePlatform("Microsoft Teams");
                  }}
                  className="w-full"
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              {fields.vedioCallSoftware.errors && (
                <p className="text-sm text-red-500">{fields.vedioCallSoftware.errors}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <GeneralSubmitButton text="Create Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}