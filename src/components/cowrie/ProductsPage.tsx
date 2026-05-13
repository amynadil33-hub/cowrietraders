import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts, fetchCategories, fetchCountries, Product, Category, Country, IMAGES } from '@/lib/cowrieData';
import type { Page } from './Header';
import { Search, MapPin, Tag, Package, CheckCircle2 } from 'lucide-react';

export default function ProductsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [trade, setTrade] = useState<'all' | 'import' | 'export'>('all');
  const [category, setCategory] = useState('all');
  const [country, setCountry] = useState('all');
  const [availability, setAvailability] = useState('all');

  useEffect(() => {
    (async () => {
      const [p, c, co] = await Promise.all([fetchProducts(), fetchCategories(), fetchCountries()]);
      setProducts(p); setCategories(c); setCountries(co);
      setLoading(false);
    })();
  }, []);

  const filteredCategories = useMemo(() => {
    if (trade === 'all') return categories;
    return categories.filter((c) => c.type === trade || c.type === 'both');
  }, [categories, trade]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (trade !== 'all' && p.trade_type !== trade) return false;
      if (category !== 'all' && p.category_id !== category) return false;
      if (country !== 'all' && p.origin_country_id !== country) return false;
      if (availability !== 'all' && p.availability_status !== availability) return false;
      return true;
    });
  }, [products, search, trade, category, country, availability]);

  const productImage = (p: Product) => {
    const n = p.name.toLowerCase();
    if (n.includes('tomato')) return IMAGES.tomatoes;
    if (n.includes('cement')) return IMAGES.cement;
    if (n.includes('dried')) return IMAGES.driedTuna;
    if (n.includes('grouper') || n.includes('reef')) return IMAGES.grouper;
    if (p.trade_type === 'export') return IMAGES.tuna;
    return IMAGES.port;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-br from-[#0c1e26] via-[#0F7F78] to-[#1BA098] text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4E4C1]/20 text-[#F4E4C1] text-xs font-semibold uppercase tracking-widest mb-4">Products</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">Product catalogue</h1>
          <p className="text-white/85 max-w-2xl">Browse imports and exports. Filter by category, origin country, trade type and availability — then request a tailored quotation.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 grid lg:grid-cols-[1fr_auto_auto_auto_auto] gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]"
            />
          </div>
          <select value={trade} onChange={(e) => setTrade(e.target.value as any)} className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
            <option value="all">All Types</option>
            <option value="import">Import</option>
            <option value="export">Export</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
            <option value="all">All Categories</option>
            {filteredCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
            <option value="all">All Origins</option>
            {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
            <option value="all">Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="On Request">On Request</option>
          </select>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-600">
            {loading ? 'Loading products…' : <><span className="font-bold text-[#1F2A37]">{filtered.length}</span> products found</>}
          </p>
          <button onClick={() => { setSearch(''); setTrade('all'); setCategory('all'); setCountry('all'); setAvailability('all'); }} className="text-sm text-[#1BA098] font-semibold hover:underline">
            Clear filters
          </button>
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-600">No products matched your filters.</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
              <div className="h-44 overflow-hidden bg-slate-100 relative">
                <img src={productImage(p)} alt={p.name} className="w-full h-full object-cover" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur ${p.trade_type === 'export' ? 'bg-[#1BA098]/90 text-white' : 'bg-[#8B7BA8]/90 text-white'}`}>
                  {p.trade_type.toUpperCase()}
                </span>
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${p.availability_status === 'In Stock' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                  {p.availability_status}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-extrabold text-[#1F2A37] mb-1">{p.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{p.description}</p>
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2"><Tag size={12} className="text-[#8B7BA8]" /><span>{p.category_name}</span></div>
                  <div className="flex items-center gap-2"><MapPin size={12} className="text-[#1BA098]" /><span>{p.origin_country || 'Various'}</span></div>
                  <div className="flex items-center gap-2"><Package size={12} className="text-[#0F7F78]" /><span>Unit: {p.default_unit}</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-600" /><span>{p.availability_status}</span></div>
                </div>
                <button onClick={() => setPage('service')} className="mt-auto w-full py-2.5 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white text-sm font-semibold hover:shadow-md transition-shadow">
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
