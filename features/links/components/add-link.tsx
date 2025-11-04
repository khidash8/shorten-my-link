"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddLinkDialog } from "@/features/links/components/editLink-dialog";

const AddLink = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Add Link
        </Button>
      </div>

      {/* Add Link Dialog */}
      <AddLinkDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
};
export default AddLink;
