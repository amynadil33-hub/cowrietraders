import { supabase } from '@/lib/supabase';

export const BRAND = {
  turquoise: '#1BA098',
  turquoiseDark: '#0F7F78',
  sand: '#F4E4C1',
  sandDeep: '#E9D2A0',
  purple: '#8B7BA8',
  purpleDark: '#6E5F8A',
  ink: '#1F2A37',
};

export const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/6a02246ac2e566a83616a38d_1778525428826_ca3b134f.png',
  port: 'https://d64gsuwffb70l.cloudfront.net/6a02246ac2e566a83616a38d_1778525474330_0db25813.jpg',
  tuna: 'https://d64gsuwffb70l.cloudfront.net/6a02246ac2e566a83616a38d_1778525455016_8c36973f.png',
  logo: 'https://d64gsuwffb70l.cloudfront.net/6a02246ac2e566a83616a38d_1778525514777_49c2e01c.png',
  tomatoes: 'https://d64gsuwffb70l.cloudfront.net/6a02246ac2e566a83616a38d_1778525532654_c019636f.jpg',
  cement: 'https://d64gsuwffb70l.cloudfront.net/6a02246ac2e566a83616a38d_1778525564604_8793a7bd.png',
  driedTuna: 'https://d64gsuwffb70l.cloudfront.net/6a02246ac2e566a83616a38d_1778525605236_8dc6e659.jpg',
  grouper: 'https://d64gsuwffb70l.cloudfront.net/6a02246ac2e566a83616a38d_1778525623307_d4411622.jpg',
};

export type Country = {
  id: string;
  name: string;
  region?: string;
  is_import_origin?: boolean;
  is_export_destination?: boolean;
};

export type Category = {
  id: string;
  name: string;
  type: 'import' | 'export' | 'both';
  description?: string;
};

export type Product = {
  id: string;
  name: string;
  category_id: string;
  trade_type: 'import' | 'export';
  description?: string;
  default_unit?: string;
  origin_country_id?: string;
  availability_status?: string;
  image_url?: string;
  // joined
  category_name?: string;
  origin_country?: string;
};

export type Unit = {
  id: string;
  name: string;
  abbreviation: string;
};

export type Branch = {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  office_hours: string;
};

export const UNIT_OPTIONS = ['kg', 'carton', 'ton', 'box', 'container', 'piece'];

export const SOURCING_COUNTRIES = [
  'Singapore', 'India', 'Sri Lanka', 'China', 'USA', 'Africa', 'Europe', 'Middle East',
];

export const REGIONS = [
  { name: 'Singapore', desc: 'Premium electronics, packaging & business supplies' },
  { name: 'India', desc: 'Fresh produce, construction materials & merchandise' },
  { name: 'Sri Lanka', desc: 'Timber, fresh fruits & general merchandise' },
  { name: 'China', desc: 'Construction materials, household & retail goods' },
  { name: 'USA', desc: 'Specialty products and commercial supplies' },
  { name: 'Africa', desc: 'Citrus, agricultural produce and commodities' },
  { name: 'Europe', desc: 'Premium goods, machinery and specialty items' },
  { name: 'Middle East', desc: 'Cement, building materials and industrial supplies' },
];

export const FREIGHT_SERVICES = [
  { name: 'Sea Freight', desc: 'Reliable container and break-bulk sea freight to and from major international ports.' },
  { name: 'Air Freight', desc: 'Time-sensitive air freight for perishable and high-value cargo with fast turnaround.' },
  { name: 'Customs Support', desc: 'Full customs clearance, HS code classification and documentation handling.' },
  { name: 'Port Handling', desc: 'Coordinated port handling at Malé Commercial Harbour and partner ports.' },
  { name: 'Island Delivery', desc: 'Local island delivery coordination across the Maldives archipelago.' },
  { name: 'Cold Chain', desc: 'Temperature-controlled cold chain for fresh and frozen marine products.' },
  { name: 'Documentation', desc: 'Import and export documentation, invoices, certificates of origin and more.' },
];

export const CUSTOMER_SERVICE_TOPICS = [
  { title: 'Product Sourcing Assistance', desc: 'Tell us what you need — we source it from our trusted global supplier network.' },
  { title: 'Import Quotation Support', desc: 'Transparent, itemised quotations covering product cost, freight and duties.' },
  { title: 'Export Product Availability', desc: 'Real-time availability for fresh, frozen and dried Maldivian marine products.' },
  { title: 'Logistics Coordination', desc: 'End-to-end shipping, customs and island delivery coordination.' },
  { title: 'Supplier & Product Verification', desc: 'Verified suppliers, quality checks and pre-shipment inspections.' },
  { title: 'WhatsApp & Email Support', desc: 'Direct, responsive support via WhatsApp and email — every business day.' },
];

export const BRANCHES_FALLBACK: Branch[] = [
  { id: '1', name: 'Head Office', location: 'Malé, Maldives', phone: '+960 333 0000', email: 'info@cowrietraders.mv', office_hours: 'Sun–Thu, 8:30 AM – 5:00 PM' },
  { id: '2', name: 'Operations Office', location: 'Hulhumalé, Maldives', phone: '+960 333 0001', email: 'operations@cowrietraders.mv', office_hours: 'Sun–Thu, 9:00 AM – 5:30 PM' },
  { id: '3', name: 'Logistics Coordination', location: 'Malé Port Area, Maldives', phone: '+960 333 0002', email: 'logistics@cowrietraders.mv', office_hours: 'Sun–Thu, 8:00 AM – 6:00 PM' },
  { id: '4', name: 'International Sourcing Desk', location: 'Singapore / India / Sri Lanka / China', phone: '+65 0000 0000', email: 'sourcing@cowrietraders.mv', office_hours: 'Mon–Fri, 9:00 AM – 6:00 PM' },
];

// Data loaders — fetch from Supabase, fall back gracefully
export async function fetchCountries(): Promise<Country[]> {
  try {
    const { data, error } = await supabase.from('countries').select('*').order('name');
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase.from('product_categories').select('*').order('name');
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_categories(name), countries(name)')
      .order('name');
    if (error) throw error;
    return (data || []).map((p: any) => ({
      ...p,
      category_name: p.product_categories?.name,
      origin_country: p.countries?.name,
    }));
  } catch {
    return [];
  }
}

export async function fetchBranches(): Promise<Branch[]> {
  try {
    const { data, error } = await supabase.from('branches').select('*').order('created_at');
    if (error) throw error;
    return (data && data.length > 0) ? data : BRANCHES_FALLBACK;
  } catch {
    return BRANCHES_FALLBACK;
  }
}

export type QuoteRequestInput = {
  trade_type: 'import' | 'export';
  product_category_id?: string | null;
  product_id?: string | null;
  origin_country_id?: string | null;
  destination_country_id?: string | null;
  quantity: number;
  unit_id?: string | null;
  preferred_delivery_date?: string | null;
  delivery_location?: string;
  customer_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  notes?: string;
};

export async function submitQuoteRequest(input: QuoteRequestInput) {
  // Also subscribe customer to CRM contact list
  try {
    await fetch('https://famous.ai/api/crm/6a02246ac2e566a83616a38d/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email,
        name: input.customer_name,
        source: 'quote-request',
        tags: ['quote-request', input.trade_type],
      }),
    });
  } catch (e) {
    // non-blocking
  }

  const { data, error } = await supabase.from('quote_requests').insert([input]).select();
  if (error) throw error;
  return data;
}
