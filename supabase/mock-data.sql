-- Cowrie Traders — Mock data
-- Run after schema.sql.

-- Countries
insert into countries (name, region, is_import_origin, is_export_destination) values
('Maldives','South Asia', false, true),
('Singapore','Southeast Asia', true, true),
('India','South Asia', true, true),
('Sri Lanka','South Asia', true, true),
('China','East Asia', true, true),
('USA','North America', true, true),
('Kenya','Africa', true, true),
('South Africa','Africa', true, true),
('UAE','Middle East', true, true),
('Saudi Arabia','Middle East', true, true),
('Germany','Europe', true, true),
('Netherlands','Europe', true, true),
('United Kingdom','Europe', true, true);

-- Units
insert into units (name, abbreviation, description) values
('Kilogram','kg','Weight in kilograms'),
('Carton','ctn','Standard carton'),
('Ton','ton','Metric ton (1000 kg)'),
('Box','box','Standard box'),
('Container','cont','Shipping container'),
('Piece','pc','Single piece');

-- Categories
insert into product_categories (name, type, description) values
('Fruits & Vegetables','import','Fresh produce imports'),
('Construction Materials','import','Building and construction supplies'),
('General Merchandise','import','Household and retail goods'),
('Commercial Supplies','import','Business and commercial supplies'),
('Tuna Products','export','Premium Maldivian tuna'),
('Reef Fish','export','Maldivian reef fish'),
('Grouper','export','Premium grouper from the Maldives'),
('Sea Cucumber','export','Processed sea cucumber'),
('Dried Tuna','export','Traditional dried tuna products'),
('Frozen Marine Products','export','Frozen seafood exports');

-- Branches
insert into branches (name, location, phone, email, office_hours) values
('Cowrie Traders','H.isles residence, Male'', Male''; 20027','+960 7912865','cowrietraders@everyones.com.mv','Sun-Thu, 8:30 AM - 5:00 PM');

-- Freight services
insert into freight_services (name, description) values
('Sea Freight','Reliable container and break-bulk sea freight to and from major ports'),
('Air Freight','Time-sensitive air freight for perishable and high-value cargo'),
('Customs Support','Full customs clearance and documentation handling'),
('Port Handling','Coordinated port handling at Malé and partner ports'),
('Island Delivery','Local island delivery coordination across the Maldives'),
('Cold Chain','Cold chain support for fresh and frozen marine products'),
('Documentation','Import/export documentation assistance');

-- Customer service topics
insert into customer_service_topics (title, description) values
('Product Sourcing','Sourcing assistance for any product on request'),
('Import Quotations','Transparent and prompt import quotations'),
('Export Availability','Real-time export product availability checks'),
('Logistics Coordination','End-to-end shipping and delivery coordination'),
('Supplier Verification','Trusted supplier and product verification'),
('WhatsApp & Email Support','Direct support via WhatsApp and email');

-- Products (import + export)
insert into products (name, category_id, trade_type, description, default_unit, origin_country_id, availability_status) values
('Tomatoes', (select id from product_categories where name='Fruits & Vegetables'), 'import','Fresh red tomatoes','kg', (select id from countries where name='India'),'In Stock'),
('Onions', (select id from product_categories where name='Fruits & Vegetables'), 'import','Fresh red onions','kg', (select id from countries where name='India'),'In Stock'),
('Potatoes', (select id from product_categories where name='Fruits & Vegetables'), 'import','Premium quality potatoes','kg', (select id from countries where name='India'),'In Stock'),
('Apples', (select id from product_categories where name='Fruits & Vegetables'), 'import','Crisp imported apples','carton', (select id from countries where name='China'),'In Stock'),
('Oranges', (select id from product_categories where name='Fruits & Vegetables'), 'import','Sweet citrus oranges','carton', (select id from countries where name='South Africa'),'In Stock'),
('Bananas', (select id from product_categories where name='Fruits & Vegetables'), 'import','Ripe bananas','carton', (select id from countries where name='Sri Lanka'),'In Stock'),
('Cement', (select id from product_categories where name='Construction Materials'), 'import','High-grade construction cement','ton', (select id from countries where name='UAE'),'In Stock'),
('Steel Bars', (select id from product_categories where name='Construction Materials'), 'import','Reinforcement steel bars','ton', (select id from countries where name='China'),'In Stock'),
('Ceramic Tiles', (select id from product_categories where name='Construction Materials'), 'import','Premium ceramic floor tiles','box', (select id from countries where name='India'),'In Stock'),
('Timber', (select id from product_categories where name='Construction Materials'), 'import','Quality construction timber','container', (select id from countries where name='Sri Lanka'),'On Request'),
('Packaging Materials', (select id from product_categories where name='General Merchandise'), 'import','Commercial packaging supplies','carton', (select id from countries where name='Singapore'),'In Stock'),
('Cleaning Supplies', (select id from product_categories where name='General Merchandise'), 'import','Household and commercial cleaning supplies','carton', (select id from countries where name='China'),'In Stock'),
('Fresh Yellowfin Tuna', (select id from product_categories where name='Tuna Products'), 'export','Premium fresh yellowfin tuna','kg', (select id from countries where name='Maldives'),'In Stock'),
('Frozen Skipjack Tuna', (select id from product_categories where name='Frozen Marine Products'), 'export','Frozen skipjack tuna','ton', (select id from countries where name='Maldives'),'In Stock'),
('Dried Tuna (Valhomas)', (select id from product_categories where name='Dried Tuna'), 'export','Traditional Maldivian dried tuna','kg', (select id from countries where name='Maldives'),'In Stock'),
('Grouper', (select id from product_categories where name='Grouper'), 'export','Premium reef grouper','kg', (select id from countries where name='Maldives'),'In Stock'),
('Reef Fish Mix', (select id from product_categories where name='Reef Fish'), 'export','Assorted Maldivian reef fish','kg', (select id from countries where name='Maldives'),'On Request'),
('Sea Cucumber', (select id from product_categories where name='Sea Cucumber'), 'export','Processed Maldivian sea cucumber','kg', (select id from countries where name='Maldives'),'In Stock'),
('Frozen Tuna Loins', (select id from product_categories where name='Frozen Marine Products'), 'export','Vacuum-packed frozen tuna loins','carton', (select id from countries where name='Maldives'),'In Stock');
