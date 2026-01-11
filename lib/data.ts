export type DocStatus = "Active" | "Expired" | "Expiring Soon" | "Pending";
export type DocType =
  | "Business License"
  | "Audit Report"
  | "Certificate of Incorporation"
  | "Environmental Permit"
  | "Security Policy";

export interface EvidenceVersion {
  version: string;
  date: string;
  uploader: string;
  notes: string;
  fileSize: string;
  fileName?: string;
}

export interface Evidence {
  id: string;
  name: string;
  type: DocType;
  status: DocStatus;
  expiry: string | null;
  versions: number;
  lastUpdated: string;
  metadata: {
    issuer?: string;
    issueDate?: string;
    description?: string;
  };
  history: EvidenceVersion[];
}

export interface BuyerRequest {
  id: string;
  docType: DocType;
  dueDate: string;
  status: "Open" | "Fulfilled";
  buyerName: string;
}

export const MOCK_EVIDENCE: Evidence[] = [
  {
    id: "ev-1",
    name: "Factory Business License 2024",
    type: "Business License",
    status: "Active",
    expiry: "2025-12-31",
    versions: 2,
    lastUpdated: "2024-01-15",
    metadata: {
      issuer: "City Commerce Bureau",
      issueDate: "2024-01-01",
      description: "Main business operating license for the factory premises.",
    },
    history: [
      {
        version: "v2",
        date: "2024-01-15",
        uploader: "John Doe",
        notes: "Updated for new year renewal",
        fileSize: "2.4 MB",
        fileName: "factory_license_2024.pdf",
      },
      {
        version: "v1",
        date: "2023-01-10",
        uploader: "Jane Smith",
        notes: "Initial upload",
        fileSize: "2.1 MB",
        fileName: "factory_license_old.pdf",
      },
    ],
  },
  {
    id: "ev-2",
    name: "Q3 Social Compliance Audit",
    type: "Audit Report",
    status: "Expired",
    expiry: "2023-09-30",
    versions: 1,
    lastUpdated: "2023-06-12",
    metadata: {
      issuer: "SGS International",
      issueDate: "2023-06-10",
      description: "Annual social compliance audit report.",
    },
    history: [
      {
        version: "v1",
        date: "2023-06-12",
        uploader: "Alice Wang",
        notes: "Q3 Audit Results",
        fileSize: "4.8 MB",
      },
    ],
  },
  {
    id: "ev-3",
    name: "ISO 14001 Certificate",
    type: "Environmental Permit",
    status: "Expiring Soon",
    expiry: "2026-02-15",
    versions: 3,
    lastUpdated: "2024-02-20",
    metadata: {
      issuer: "Global Standards Body",
      issueDate: "2023-02-15",
      description: "Environmental management system certification.",
    },
    history: [
      {
        version: "v3",
        date: "2024-02-20",
        uploader: "John Doe",
        notes: "Renewal certificate",
        fileSize: "1.2 MB",
      },
      {
        version: "v2",
        date: "2023-02-14",
        uploader: "John Doe",
        notes: "Annual review",
        fileSize: "1.1 MB",
      },
      {
        version: "v1",
        date: "2022-02-10",
        uploader: "Admin",
        notes: "Initial certification",
        fileSize: "1.0 MB",
      },
    ],
  },
  {
    id: "ev-4",
    name: "Security Infrastructure Policy",
    type: "Security Policy",
    status: "Active",
    expiry: null,
    versions: 1,
    lastUpdated: "2023-11-05",
    metadata: {
      issuer: "Internal Security Dept",
      issueDate: "2023-11-01",
      description: "Corporate security guidelines and infrastructure policy.",
    },
    history: [
      {
        version: "v1",
        date: "2023-11-05",
        uploader: "Jane Smith",
        notes: "First draft approved",
        fileSize: "0.8 MB",
      },
    ],
  },
];

export const MOCK_REQUESTS: BuyerRequest[] = [
  {
    id: "req-1",
    docType: "Audit Report",
    dueDate: "2024-04-01",
    status: "Open",
    buyerName: "Global Retail Corp",
  },
  {
    id: "req-2",
    docType: "Environmental Permit",
    dueDate: "2024-03-15",
    status: "Fulfilled",
    buyerName: "Eco-Fashion Brand",
  },
  {
    id: "req-3",
    docType: "Business License",
    dueDate: "2024-05-10",
    status: "Open",
    buyerName: "Fast Logistic Ltd",
  },
];
