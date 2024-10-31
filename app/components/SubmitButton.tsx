import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return <>{pending ? <Button disabled><Loader2 className="size-4 mr-2 animate-spin" /> please wait !</Button> : <Button><FcGoogle/> Sign in with Google</Button>}</>;
}
