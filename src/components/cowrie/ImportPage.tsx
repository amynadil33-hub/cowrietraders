import React from 'react';
import { SOURCING_COUNTRIES, IMAGES } from '@/lib/cowrieData';
import type { Page } from './Header';
import { Apple, Building2, Boxes, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

const cats = [
  {
    icon: Apple, t: 'Fruits & Vegetables',
    desc: 'Fresh produce sourced from trusted growers and consolidators across the region.',
    items: ['Tomatoes', 'Onions', 'Potatoes', 'Apples', 'Oranges', 'Bananas', 'Carrots', 'Cabbage', 'Leafy greens'],
    color: 'from-rose-500 to-orange-500',
  },
  {
    icon: Building2, t: 'Construction Materials',
    desc: 'Building supplies for residential, commercial and resort projects across the Maldives.',
    items: ['Cement', 'Steel', 'Tiles', 'Timber', 'Electrical supplies', 'Plumbing supplies', 'Fixtures', 'Tools'],
    color: 'from-slate-600 to-slate-800',
  },
  {
    icon: Boxes, t: 'General Merchandise',
    desc: 'Everyday household and retail goods for shops, supermarkets and businesses.',
    items: ['Household goods', 'Cleaning supplies', 'Packaging materials', 'Retail items', 'Business supplies'],
    color: 'from-[#8B7BA8] to-[#6E5F8A]',
  },
  {
    icon: Briefcase, t: 'Commercial Supplies',
    desc: 'Office, hospitality and operations supplies for businesses of every size.',
    items: ['Office supplies', 'Hospitality goods', 'Operational consumables', 'Bulk packaging'],
    color: 'from-[#1BA098] to-[#0F7F78]',
  },
  {
    icon: Sparkles, t: 'Custom Sourcing',
    desc: 'Need something specific? We source bespoke products against your requirements.',
    items: ['Product specifications', 'Supplier verification', 'Sample approvals', 'Quality control'],
    color: 'from-amber-500 to-[#E9D2A0]',
  },
];

export default function ImportPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-[#0c1e26] via-[#0F7F78] to-[#1BA098] text-white py-20">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${IMAGES.port})`, backgroundSize: 'cover' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1e26]/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4E4C1]/20 text-[#F4E4C1] text-xs font-semibold uppercase tracking-widest mb-5">Import Services</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-3xl">Import the essentials — sourced from around the world</h1>
          <p className="text-white/85 max-w-2xl text-lg">
            We import general merchandise, fresh fruits and vegetables, construction materials and
            commercial supplies on behalf of Maldivian businesses, with transparent pricing and
            end-to-end logistics handled for you.
          </p>
        </div>
      </section>

      {/* Sourcing countries */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">Sourcing Countries</h2>
          <p className="text-center text-2xl font-extrabold text-[#1F2A37] mb-8">We source from 8 key global regions</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SOURCING_COUNTRIES.map((c) => (
              <span key={c} className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-[#0F7F78] font-semibold text-sm shadow-sm">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">Import Categories</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37]">Categories we import</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cats.map((c) => (
              <div key={c.t} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`h-2 bg-gradient-to-r ${c.color}`} />
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#F4E4C1] flex items-center justify-center mb-4">
                    <c.icon size={22} className="text-[#0F7F78]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1F2A37] mb-2">{c.t}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.items.map((i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">{i}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-xl p-10 md:p-12 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#1F2A37] mb-2">
                Need a specific product?
              </h3>
              <p className="text-slate-600">Submit a sourcing request and we will find it for you — transparent quotes and verified suppliers.</p>
            </div>
            <div className="md:text-right">
              <button onClick={() => setPage('service')} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white font-semibold shadow-lg hover:shadow-xl transition-shadow">
                Submit a Sourcing Request <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
