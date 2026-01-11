"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EvidenceVersion } from "@/lib/data";

interface UploadNewVersionProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newVersion: EvidenceVersion) => void;
  currentVersionCount: number;
}

export default function UploadNewVersion({
  isOpen,
  onClose,
  onUpload,
  currentVersionCount,
}: UploadNewVersionProps) {
  const [notes, setNotes] = useState("");
  const [expiry, setExpiry] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const newVersion: EvidenceVersion = {
      version: `v${currentVersionCount + 1}`,
      date: new Date().toISOString().split("T")[0],
      uploader: "Factory Admin",
      notes: notes,
      fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      fileName: selectedFile.name,
    };

    onUpload(newVersion);
    setNotes("");
    setExpiry("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Upload New Version
          </DialogTitle>
        </DialogHeader>

        <form
          id="upload-form"
          onSubmit={handleUpload}
          className="space-y-5 py-4"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block ml-1">
              Notes <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              placeholder="What has changed in this version?"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none min-h-[100px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block ml-1">
              Expiry Date (Optional)
            </label>
            <Input
              type="date"
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block ml-1">
              File Upload <span className="text-rose-500">*</span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all mb-3 shadow-sm">
                <Upload size={20} />
              </div>
              {selectedFile ? (
                <div className="text-center">
                  <p className="text-sm font-bold text-primary">
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Click to change file
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs font-medium text-slate-500">
                    Drag & drop or{" "}
                    <span className="text-primary font-bold underline">
                      browse
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    PDF, PNG, JPG (Max 10MB)
                  </p>
                </>
              )}
            </div>
          </div>
        </form>

        <DialogFooter className="flex justify-end gap-3 sm:justify-end border-t border-slate-100 pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="font-semibold text-slate-600"
          >
            Cancel
          </Button>
          <Button
            form="upload-form"
            type="submit"
            disabled={!selectedFile}
            className="px-6 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            Upload & Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
