"use client";

import React, { useState } from "react";
import { MOCK_REQUESTS, BuyerRequest } from "@/lib/data";

// New Reorganized Imports
import Header from "@/components/buyer-req/Header";
import RequestsTable from "@/components/buyer-req/Table";
import FullfillRequest from "@/components/buyer-req/FullfillRequest";
import ProTip from "@/components/buyer-req/ProTip";

export default function RequestsPage() {
  const [requests, setRequests] = useState<BuyerRequest[]>(MOCK_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<BuyerRequest | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFulfillInit = (req: BuyerRequest) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const completeFulfillment = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "Fulfilled" } : r))
    );
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <Header
        openCount={requests.filter((r) => r.status === "Open").length}
        fulfilledCount={requests.filter((r) => r.status === "Fulfilled").length}
      />

      <RequestsTable requests={requests} onFulfill={handleFulfillInit} />

      <ProTip />

      <FullfillRequest
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        onFulfill={completeFulfillment}
      />
    </div>
  );
}
