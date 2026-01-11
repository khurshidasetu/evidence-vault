"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto">{children}</div>
        {footer && (
          <DialogFooter className="flex justify-end gap-3 sm:justify-end border-t border-slate-100 pt-4">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
