import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { PiTrash } from "react-icons/pi";

export default function DeleteUserDialog({
  id,
  onConfirmDelete,
  onCancel,
  deleteUserDialogOpen,
  setDeletteUserDialogOpen,
}: {
  id: string;
  onConfirmDelete: (id: string) => void;
  onCancel: () => void;
  deleteUserDialogOpen: boolean;
  setDeletteUserDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={deleteUserDialogOpen} onOpenChange={setDeletteUserDialogOpen}>
      <DialogContent>
        <DialogHeader className="font-bold text-2xl text-neutral-1000 text-center sm:text-center">
          Delete this user
        </DialogHeader>
        <p className="text-neutral-700 text-center max-w-[350px] mx-auto">
          This user and all associated data will be permanently removed. Do you
          wish to continue
        </p>

        <div className="flex justify-center gap-x-3">
          <Button
            onClick={onCancel}
            className="text-neutral-800 bg-neutral-200 border border-neutral-500"
          >
            Cancel action
          </Button>
          <Button
            className="space-x-2 text-error-600 bg-error-100 border border-error-300"
            onClick={() => onConfirmDelete(id)}
          >
            <PiTrash />
            <span>Yes, Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
