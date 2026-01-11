"use client";

import React, { useState } from "react";
import { Search, Plus, FileText, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BuyerRequest, MOCK_EVIDENCE } from "@/lib/data";
import { StatusChip } from "@/components/ui/StatusChip";
import SelectVaultTable from "./SelectVaultTable";

interface FullfillRequestProps {
  isOpen: boolean;
  onClose: () => void;
  request: BuyerRequest | null;
  onFulfill: (requestId: string) => void;
}

export default function FullfillRequest({
  isOpen,
  onClose,
  request,
  onFulfill,
}: FullfillRequestProps) {
  const [fulfillmentType, setFulfillmentType] = useState<"existing" | "new">(
    "existing"
  );
  const [selectedEvidenceId, setSelectedEvidenceId] = useState("");

  const handleSubmit = () => {
    if (request) {
      onFulfill(request.id);
      onClose();
      setSelectedEvidenceId("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 leading-tight">
            Fulfill Request:{" "}
            <span className="text-primary">{request?.docType}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                Buyer
              </p>
              <p className="font-bold text-slate-900 border-none bg-transparent h-auto p-0">
                {request?.buyerName}
              </p>
            </div>
            <StatusChip status={request?.status || ""} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFulfillmentType("existing")}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center h-full ${
                fulfillmentType === "existing"
                  ? "border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10"
                  : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  fulfillmentType === "existing"
                    ? "bg-primary/20"
                    : "bg-white shadow-sm"
                }`}
              >
                <Search size={20} />
              </div>
              <span className="text-xs font-bold">Use Vault</span>
            </button>
            <button
              onClick={() => setFulfillmentType("new")}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center h-full ${
                fulfillmentType === "new"
                  ? "border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10"
                  : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  fulfillmentType === "new"
                    ? "bg-primary/20"
                    : "bg-white shadow-sm"
                }`}
              >
                <Plus size={20} />
              </div>
              <span className="text-xs font-bold">Upload New</span>
            </button>
          </div>

          {fulfillmentType === "existing" ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-slate-700 ml-1">
                Select from Evidence Vault
              </label>
              <SelectVaultTable
                data={MOCK_EVIDENCE}
                selectedId={selectedEvidenceId}
                onSelect={setSelectedEvidenceId}
              />
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center bg-slate-50/50 group hover:border-primary/50 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary mb-4 shadow-sm transition-all group-hover:scale-110">
                  <FileText size={28} />
                </div>
                <p className="text-sm font-bold text-slate-700">Quick Upload</p>
                <p className="text-xs text-slate-500 text-center max-w-[180px] mt-2">
                  Document not in vault? Upload it here and we'll save it for
                  you.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 font-bold border-slate-200 h-9 bg-white hover:bg-slate-50"
                >
                  Select File
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-3 sm:justify-end border-t border-slate-100 pt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="font-semibold text-slate-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={fulfillmentType === "existing" && !selectedEvidenceId}
            className="px-6 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            Fulfill Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
