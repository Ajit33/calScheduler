import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import Link from "next/link";

interface EmptySateProps{
    title:string,
    description:string,
    buttontext:string,
    href:string
}
export function EmptyState({title,buttontext,description,href}:EmptySateProps) {
  return (
    <div className="flex flex-col flex-1  h-full items-center justify-center rounded-md border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground">{description}</p>
      <Button>
        <Link href={href}>{buttontext}</Link>
      </Button>
    </div>
  );
}
