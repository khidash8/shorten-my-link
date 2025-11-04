"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, PencilIcon } from "lucide-react";
import { EditLinkDialog } from "@/features/links/components/editLink-dialog";
import { AddLinkDialog } from "@/features/links/components/editLink-dialog";
import { ShortLink } from "@/features/links/types/link-types";
import { DeleteLinkDialogue } from "@/features/links/components/delete-link-dialogue";
import { dateOptions } from "@/lib/intl-converter";

type DashboardLinksTableProps = {
  links: ShortLink[];
};

export function DashboardLinksTable({ links }: DashboardLinksTableProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<ShortLink | undefined>();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = (link: ShortLink) => {
    setEditingLink(link);
    setIsEditOpen(true);
  };

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Add Link
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Short URL</TableHead>
                <TableHead>Original URL</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links?.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <a
                      href={`${baseUrl}/go/${link.shortCode}`}
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      {baseUrl}/go/{link.shortCode}
                    </a>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {link.originalUrl}
                  </TableCell>
                  <TableCell>{link.clicks}</TableCell>
                  <TableCell>
                    {new Date(link.createdAt).toLocaleString(
                      "en-IN",
                      dateOptions,
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer rounded-xl"
                      onClick={() => handleEditClick(link)}
                    >
                      <PencilIcon size={16} />
                    </Button>

                    <DeleteLinkDialogue id={link.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Link Dialog */}
      <AddLinkDialog open={isAddOpen} onOpenChange={setIsAddOpen} />

      {/* Edit Link Dialog */}
      <EditLinkDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        link={editingLink}
      />
    </>
  );
}
