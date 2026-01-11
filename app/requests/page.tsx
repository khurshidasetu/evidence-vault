"use client";

import React, { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  FileText,
} from "lucide-react";
import {
  MOCK_REQUESTS,
  MOCK_EVIDENCE,
  BuyerRequest,
  Evidence,
} from "@/lib/data";
import { StatusChip } from "@/components/ui/StatusChip";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

export default function RequestsPage() {
  const [requests, setRequests] = useState<BuyerRequest[]>(MOCK_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<BuyerRequest | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fulfillmentType, setFulfillmentType] = useState<"existing" | "new">(
    "existing"
  );
  const [selectedEvidenceId, setSelectedEvidenceId] = useState("");

  const handleFulfill = (req: BuyerRequest) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const submitFulfillment = () => {
    if (!selectedRequest) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id ? { ...r, status: "Fulfilled" } : r
      )
    );

    setIsModalOpen(false);
    setSelectedRequest(null);
    setSelectedEvidenceId("");
  };

  const columns = [
    {
      header: "Requested Document",
      accessor: (r: BuyerRequest) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">{r.docType}</span>
          <span className="text-[10px] text-slate-400 font-medium">
            REQ-ID: {r.id.toUpperCase()}
          </span>
        </div>
      ),
    },
    {
      header: "Buyer",
      accessor: (r: BuyerRequest) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
            {r.buyerName[0]}
          </div>
          <span className="text-sm">{r.buyerName}</span>
        </div>
      ),
    },
    {
      header: "Due Date",
      accessor: (r: BuyerRequest) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-400" />
          <span className="text-sm font-medium">{r.dueDate}</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (r: BuyerRequest) => <StatusChip status={r.status} />,
    },
    {
      header: "Action",
      accessor: (r: BuyerRequest) =>
        r.status === "Open" ? (
          <Button
            variant="outline"
            onClick={() => handleFulfill(r)}
            className="h-8 rounded-lg bg-primary/5 text-primary border-primary/20 hover:bg-primary font-bold transition-all text-xs"
          >
            Fulfill Request
          </Button>
        ) : (
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold px-4 py-1.5">
            <CheckCircle2 size={14} />
            Completed
          </div>
        ),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Buyer Requests
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Submit evidence to buyers and fulfill compliance requirements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-sm shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="font-bold">
                {requests.filter((r) => r.status === "Open").length}
              </span>
              <span className="text-slate-400">Open</span>
            </div>
            <div className="w-px h-4 bg-slate-200"></div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="font-bold">
                {requests.filter((r) => r.status === "Fulfilled").length}
              </span>
              <span className="text-slate-400">Fulfilled</span>
            </div>
          </div>
        </div>
      </div>

      <Table data={requests} columns={columns} idField="id" />

      <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 flex items-start gap-4">
        <div className="p-3 bg-white rounded-xl shadow-sm text-primary border border-primary/5">
          <AlertCircle size={24} />
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground/20 text-slate-900 text-sm">
            Pro Tip: Bulk Fulfillment
          </h4>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            You can fulfill multiple requests at once by selecting them from the
            vault and creating a "Share Pack". This simplifies sharing updated
            versions with all your buyers.
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Fulfill Request: ${selectedRequest?.docType}`}
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="font-semibold text-slate-500"
            >
              Cancel
            </Button>
            <Button
              onClick={submitFulfillment}
              disabled={fulfillmentType === "existing" && !selectedEvidenceId}
              className="px-6 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              Fulfill Item
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Request Details
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">
                  {selectedRequest?.buyerName}
                </p>
                <p className="text-xs text-slate-500">
                  Due: {selectedRequest?.dueDate}
                </p>
              </div>
              <StatusChip status={selectedRequest?.status || ""} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFulfillmentType("existing")}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center h-full ${
                fulfillmentType === "existing"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  fulfillmentType === "existing" ? "bg-primary/10" : "bg-white"
                }`}
              >
                <Search size={20} />
              </div>
              <span className="text-xs font-bold">Use Existing From Vault</span>
            </button>
            <button
              onClick={() => setFulfillmentType("new")}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center h-full ${
                fulfillmentType === "new"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  fulfillmentType === "new" ? "bg-primary/10" : "bg-white"
                }`}
              >
                <Plus size={20} />
              </div>
              <span className="text-xs font-bold">Create New Evidence</span>
            </button>
          </div>

          {fulfillmentType === "existing" ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-slate-700 ml-1">
                Select Vault Item
              </label>
              <div className="max-h-[250px] overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100 bg-white">
                {MOCK_EVIDENCE.map((ev) => (
                  <label
                    key={ev.id}
                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                      selectedEvidenceId === ev.id ? "bg-primary/5" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="evidence"
                      className="accent-primary w-4 h-4"
                      checked={selectedEvidenceId === ev.id}
                      onChange={() => setSelectedEvidenceId(ev.id)}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {ev.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {ev.type} • Last updated {ev.lastUpdated}
                      </p>
                    </div>
                    <StatusChip status={ev.status} className="scale-90" />
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                  <FileText size={28} />
                </div>
                <p className="text-sm font-bold text-slate-700">Quick Upload</p>
                <p className="text-xs text-slate-500 text-center max-w-[180px] mt-2">
                  Missing a document? Upload it here to fulfill and add to vault
                  simultaneously.
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
      </Modal>
    </div>
  );
}
