"use client";

import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EvidenceVersion } from "@/lib/data";

interface UploadVersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newVersion: EvidenceVersion) => void;
  currentVersionCount: number;
}

export const UploadVersionModal: React.FC<UploadVersionModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  currentVersionCount,
}) => {
  const [notes, setNotes] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newVersion: EvidenceVersion = {
      version: `v${currentVersionCount + 1}`,
      date: new Date().toISOString().split("T")[0],
      uploader: "Factory Admin",
      notes: notes,
      fileSize: "1.5 MB",
    };

    onUpload(newVersion);
    setNotes("");
    setExpiry("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload New Version"
      footer={
        <>
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
            className="px-6 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Upload & Update
          </Button>
        </>
      }
    >
      <form id="upload-form" onSubmit={handleUpload} className="space-y-5">
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
            File Upload
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all mb-3 shadow-sm">
              <Upload size={20} />
            </div>
            <p className="text-xs font-medium text-slate-500">
              Drag & drop or{" "}
              <span className="text-primary font-bold underline">browse</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              PDF, PNG, JPG (Max 10MB)
            </p>
          </div>
        </div>
      </form>
    </Modal>
  );
};
