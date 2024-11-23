import { EditEventTypeForm } from "@/app/components/EditEventType";
import prisma from "@/app/lib/db";
import { Award } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      vedioCallSoftware: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { eventTypeId: string };
}) {
  const data = await getData(params.eventTypeId);
  return (
    <EditEventTypeForm callprovider={data.vedioCallSoftware} description={data.description} id={data.id} duration={data.duration} url={data.url}  title={data.title} />
  );
}
