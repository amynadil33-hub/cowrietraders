-- Cowrie Traders — Row Level Security policies
-- Run after schema.sql.

alter table countries enable row level security;
alter table product_categories enable row level security;
alter table units enable row level security;
alter table products enable row level security;
alter table quote_requests enable row level security;
alter table branches enable row level security;
alter table freight_services enable row level security;
alter table customer_service_topics enable row level security;

-- Public-readable reference tables
drop policy if exists "public read countries" on countries;
create policy "public read countries" on countries for select using (true);

drop policy if exists "public read product_categories" on product_categories;
create policy "public read product_categories" on product_categories for select using (true);

drop policy if exists "public read units" on units;
create policy "public read units" on units for select using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);

drop policy if exists "public read branches" on branches;
create policy "public read branches" on branches for select using (true);

drop policy if exists "public read freight_services" on freight_services;
create policy "public read freight_services" on freight_services for select using (true);

drop policy if exists "public read customer_service_topics" on customer_service_topics;
create policy "public read customer_service_topics" on customer_service_topics for select using (true);

-- Quote requests: public can INSERT only. SELECT/UPDATE/DELETE remain
-- restricted to the service_role (which automatically bypasses RLS).
drop policy if exists "public insert quote_requests" on quote_requests;
create policy "public insert quote_requests" on quote_requests
  for insert with check (true);
