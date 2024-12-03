import { DeleteEventTypeAction } from "@/app/action/action";
import { GeneralSubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function DeleteEventType({params}:{
    params:Promise<{eventTypeId:string}>
}) {
  const eventTypeId= (await params).eventTypeId
    if (!eventTypeId) {
        return <div>Error: Event Type ID is missing.</div>;
      }
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Delete EventType</CardTitle>
          <CardDescription>Are you sure to delete this event ?</CardDescription>
        </CardHeader>
        <CardFooter className=" w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={ eventTypeId} />
           <GeneralSubmitButton text="Delete" variant="destructive"/>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
