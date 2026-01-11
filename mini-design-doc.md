# Mini Design Doc: Evidence Vault

## Stack Choice

- **Frontend**: Next.js (App Router), Tailwind CSS, Shadcn/UI.
  - _Why_: High developer velocity, excellent component ecosystem, and built-in API routes for rapid full-stack development.
- **Backend**: Next.js Server Actions & API Routes.
  - _Why_: Minimizes boilerplate and provides a unified DX. Can scale to a dedicated Node.js microservice if complexity increases.
- **Database**: PostgreSQL (via Prisma or Drizzle).
  - _Why_: Relational structure is critical for maintaining strict audit trails and complex relationships between businesses, documents, and buyers.
- **Storage**: AWS S3 or Google Cloud Storage.
  - _Why_: Industry standard for secure, durable object storage. Supports signed URLs for temporary, secure document access.

## Data Model

- **Business**: Profile of the entity owning the evidence.
- **Evidence**: Metadata for a specific document (e.g., "SOC2 Report").
- **EvidenceVersion**: Individual file uploads linked to an `Evidence` entry.
- **Buyer**: External entities that request or receive documents.
- **BuyerRequest**: Tracking specific "open" requests for documents from buyers.
- **Disclosure**: Log of which `EvidenceVersion` was shared with which `Buyer`.
- **SharePack**: A curated collection of `EvidenceVersions` bundled for a specific disclosure event.

## Selective Disclosure (Phase A)

- **Simple Rules**:
  1.  **Status Check**: Only documents marked as "Active" or "Verified" can be shared.
  2.  **Explicit Consent**: Each share event requires a user to manually select the specific versions.
  3.  **Expiry Masking**: Documents past their expiry date are flagged and excluded from auto-fulfillment.

## Export Pack Approach

- **Async Job Idea**: When a "Share Pack" is requested for export, a background worker (e.g., BullMQ with Redis) handles:
  1.  Fetching files from storage.
  2.  Zipping them into a single archive.
  3.  Generating a PDF manifest with audit hashes.
  4.  Uploading the bundle to a "transfers" bucket.
  5.  Triggering an email notification with a secure download link.

## Testing Plan (Minimum)

- **Unit Tests**: Validate disclosure logic (e.g., "Can I share an expired doc?").
- **Integration Tests**: Verify the "Fulfill Request" flow from UI to DB record creation.
- **E2E (Playwright)**: Happy path of a Buyer requesting, Seller fulfilling, and the resulting audit log check.

## 8-Week Delivery Plan

1.  **M1: Core Vault (W1-2)**: Basic CRUD for Evidence, file upload to S3, versioning UI.
2.  **M2: Requests & Identity (W3-4)**: Buyer Request portal, basic RBAC, and manual fulfillment UI.
3.  **M3: Disclosure Engine (W5-6)**: Selective disclosure rules, audit trail logging, and basic "Share Pack" creation.
4.  **M4: Automation & Exports (W7-8)**: Async export jobs, email notifications, and dashboard analytics for document health.
