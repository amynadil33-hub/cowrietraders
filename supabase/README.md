# Cowrie Traders — Supabase Backend

This folder contains the SQL needed to spin up the Supabase backend that powers
the Cowrie Traders website (product catalogue, quote request portal, branches,
freight services, etc.).

## Files

| File | Purpose |
|------|---------|
| `schema.sql` | Creates all tables (`countries`, `product_categories`, `products`, `units`, `quote_requests`, `branches`, `freight_services`, `customer_service_topics`). |
| `mock-data.sql` | Seeds the database with realistic mock data for development. |
| `policies.sql` | Enables Row Level Security and applies the access policies. |

## Setup order

1. Open the Supabase SQL editor.
2. Run **`schema.sql`**.
3. Run **`mock-data.sql`**.
4. Run **`policies.sql`**.

## Row Level Security

- `countries`, `product_categories`, `products`, `units`, `branches`,
  `freight_services`, `customer_service_topics` — **public read** only.
- `quote_requests` — **public insert** only. Reading and managing quote
  requests is restricted to the `service_role` (admin), which bypasses RLS.

## Front-end configuration

The web app reads from these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

In this Vite + React build, the Supabase client is initialised in
`src/lib/supabase.ts`. All data loaders live in `src/lib/cowrieData.ts`,
which gracefully falls back to local data if Supabase is unreachable.

## Tables overview

### countries
Stores all origin and destination countries with region metadata and flags
for `is_import_origin` / `is_export_destination`.

### product_categories
Trade categories (`import`, `export`, or `both`) such as
*Fruits & Vegetables*, *Construction Materials*, *Tuna Products*.

### products
The main catalogue. Linked to `product_categories` and `countries`.

### units
Standard units used in quotations: `kg`, `carton`, `ton`, `box`,
`container`, `piece`.

### quote_requests
Customer-submitted quotations from the **Customer Service Portal**.

### branches
Physical office locations (Head Office, Operations, Logistics, Sourcing Desk).

### freight_services / customer_service_topics
Static reference content rendered on the public site.
