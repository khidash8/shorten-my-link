"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoaderSpinner } from "@/components/loader-spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DeleteCourseDialogueProps = {
  id: string;
};

export const DeleteLinkDialogue = ({ id }: DeleteCourseDialogueProps) => {
  const [open, setOpen] = React.useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const response = await fetch(`/api/links/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error);
        } else {
          setOpen(false);
          router.refresh();
          toast.success("Link deleted successfully");
        }
      } catch {
        toast.error("Error deleting link");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-xl"
        >
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            link.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={pending}>
            {pending ? <LoaderSpinner label="Deleting..." /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
