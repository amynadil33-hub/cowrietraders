import React from 'react';
import { IMAGES, REGIONS } from '@/lib/cowrieData';
import type { Page } from './Header';
import { Ship, Plane, Anchor, Package, ShieldCheck, Globe, BadgeCheck, Headphones, ArrowRight, Fish, Building2, Apple, Boxes } from 'lucide-react';

const stats = [
  { n: '10+', l: 'Years of Trade Experience' },
  { n: '13+', l: 'Sourcing Countries' },
  { n: '500+', l: 'Successful Shipments' },
  { n: '24/7', l: 'Logistics Support' },
];

const services = [
  { icon: Ship, t: 'Import', d: 'General merchandise, fresh produce, construction materials and commercial supplies from trusted global suppliers.' },
  { icon: Anchor, t: 'Export', d: 'Premium Maldivian marine products — fresh, frozen and dried tuna, grouper, reef fish and sea cucumber.' },
  { icon: Package, t: 'Sourcing', d: 'Custom product sourcing based on your specifications, with supplier verification and quality control.' },
  { icon: Plane, t: 'Freight & Logistics', d: 'Sea and air freight, customs clearance, port handling and island delivery coordination.' },
];

const whyUs = [
  { icon: ShieldCheck, t: 'Reliable Sourcing', d: 'Vetted suppliers across 13+ countries and a proven track record of on-time delivery.' },
  { icon: BadgeCheck, t: 'Quality Assurance', d: 'Pre-shipment inspections, sample approvals and rigorous quality checks on every order.' },
  { icon: Globe, t: 'International Network', d: 'Established partnerships across Asia, Europe, Africa, the USA and the Middle East.' },
  { icon: Package, t: 'Transparent Quotations', d: 'Itemised quotations covering product, freight, duties and clearance — no hidden fees.' },
  { icon: Headphones, t: 'Customer-Focused Service', d: 'Dedicated account managers and direct WhatsApp & email support every business day.' },
  { icon: Anchor, t: 'Maldives Expertise', d: 'Deep knowledge of local ports, customs and inter-island logistics.' },
];

const categories = [
  { icon: Apple, t: 'Fruits & Vegetables', d: 'Tomatoes, onions, potatoes, apples, oranges, bananas and more.', tag: 'Import' },
  { icon: Building2, t: 'Construction Materials', d: 'Cement, steel, tiles, timber, electrical and plumbing supplies.', tag: 'Import' },
  { icon: Boxes, t: 'General Merchandise', d: 'Household goods, cleaning supplies, packaging and retail items.', tag: 'Import' },
  { icon: Fish, t: 'Maldivian Marine Products', d: 'Fresh and frozen tuna, grouper, reef fish, sea cucumber.', tag: 'Export' },
];

export default function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="Cargo ship at sea" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1e26]/90 via-[#0F7F78]/75 to-[#1BA098]/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F4E4C1]/20 border border-[#F4E4C1]/40 text-[#F4E4C1] text-xs font-semibold uppercase tracking-widest mb-6">
              International Trade · Maldives
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Connecting the Maldives <br />
              <span className="text-[#F4E4C1]">to Global Trade</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-9 max-w-2xl">
              Cowrie Traders provides reliable import, export, sourcing, marine product supply, and
              logistics solutions for businesses across the Maldives and international markets.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage('service')} className="px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Request a Quote <ArrowRight size={18} />
              </button>
              <button onClick={() => setPage('products')} className="px-7 py-3.5 rounded-lg bg-white text-[#0F7F78] font-semibold shadow-xl hover:bg-[#F4E4C1] transition-colors">
                Explore Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {stats.map((s) => (
              <div key={s.l} className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#1BA098]">{s.n}</div>
                <div className="text-xs md:text-sm mt-1 text-slate-500 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-block text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">About Cowrie Traders</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37] leading-tight mb-5">
              A trusted Maldivian trade partner with a global reach.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              From our base in Malé, we coordinate imports of essential goods for Maldivian
              businesses — fresh produce, construction materials, general merchandise and
              commercial supplies — sourced from Singapore, India, Sri Lanka, China, the USA,
              Africa, Europe and the Middle East.
            </p>
            <p className="text-slate-600 leading-relaxed mb-7">
              We also export premium Maldivian marine products to international markets, including
              fresh and frozen tuna, grouper, reef fish, dried tuna and sea cucumber — handled with
              full cold chain support and export-standard documentation.
            </p>
            <button onClick={() => setPage('contact')} className="text-[#1BA098] font-semibold hover:gap-3 flex items-center gap-2 transition-all">
              Learn more about us <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative">
            <img src={IMAGES.port} alt="Port" className="rounded-2xl shadow-2xl w-full" />
            <div className="absolute -bottom-6 -left-6 bg-[#F4E4C1] rounded-2xl p-5 shadow-xl max-w-[200px] hidden md:block">
              <div className="text-[#8B7BA8] text-xs font-bold uppercase tracking-wider">Since</div>
              <div className="text-[#0F7F78] text-4xl font-extrabold">2014</div>
              <div className="text-slate-600 text-xs">Serving Maldivian businesses</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">What We Do</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37]">End-to-end trade solutions</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.t} className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-[#1BA098]/30 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1BA098] to-[#0F7F78] flex items-center justify-center mb-5">
                  <s.icon size={26} className="text-white" />
                </div>
                <h3 className="font-extrabold text-lg text-[#1F2A37] mb-2">{s.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">Global Sourcing Network</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37]">Sourcing from 8 key regions</h2>
            <p className="text-slate-600 mt-4">Trusted supplier partnerships across Asia, Europe, Africa, the USA and the Middle East.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {REGIONS.map((r) => (
              <div key={r.name} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-5 border border-slate-100 hover:border-[#1BA098]/40 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#1BA098]" />
                  <div className="font-bold text-[#0F7F78]">{r.name}</div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARINE EXPORTS */}
      <section className="py-20 bg-gradient-to-br from-[#0c1e26] to-[#0F7F78] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-xs font-bold tracking-widest text-[#F4E4C1] uppercase mb-3">Maldivian Marine Exports</div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">Premium seafood from the heart of the Indian Ocean</h2>
            <p className="text-white/85 leading-relaxed mb-6">
              We export sustainably-sourced Maldivian marine products to international buyers,
              including fresh yellowfin tuna, frozen skipjack, dried tuna (Valhomas), grouper, reef
              fish and processed sea cucumber.
            </p>
            <ul className="space-y-2 mb-7">
              {['Fresh and frozen tuna products', 'Grouper and reef fish', 'Dried tuna and value-added products', 'Sea cucumber and other marine products'].map((i) => (
                <li key={i} className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#F4E4C1]" />{i}</li>
              ))}
            </ul>
            <button onClick={() => setPage('export')} className="px-6 py-3 rounded-lg bg-[#F4E4C1] text-[#0F7F78] font-semibold hover:bg-white transition-colors">
              View Export Products
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={IMAGES.tuna} alt="Fresh tuna" className="rounded-xl shadow-2xl col-span-2 h-48 object-cover w-full" />
            <img src={IMAGES.driedTuna} alt="Dried tuna" className="rounded-xl shadow-xl h-40 object-cover w-full" />
            <img src={IMAGES.grouper} alt="Grouper" className="rounded-xl shadow-xl h-40 object-cover w-full" />
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">Why Choose Us</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37]">Built on trust, delivered with precision</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w) => (
              <div key={w.t} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-[#F4E4C1] flex items-center justify-center mb-4">
                  <w.icon size={22} className="text-[#0F7F78]" />
                </div>
                <h3 className="font-bold text-[#1F2A37] mb-1.5">{w.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">Featured Product Categories</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37]">Trade across multiple product lines</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <button key={c.t} onClick={() => setPage('products')} className="text-left bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#1BA098]/40 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1BA098]/15 to-[#1BA098]/5 flex items-center justify-center">
                    <c.icon size={22} className="text-[#1BA098]" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${c.tag === 'Import' ? 'bg-[#8B7BA8]/15 text-[#6E5F8A]' : 'bg-[#1BA098]/15 text-[#0F7F78]'}`}>
                    {c.tag.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-[#1F2A37] mb-1.5 group-hover:text-[#1BA098]">{c.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.d}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#1BA098] to-[#0F7F78] p-10 md:p-14 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Ready to trade with Cowrie Traders?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-7">
              Submit a quotation request and our customer service team will get back to you with
              transparent pricing and availability — usually within one business day.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => setPage('service')} className="px-7 py-3.5 rounded-lg bg-white text-[#0F7F78] font-bold hover:bg-[#F4E4C1] transition-colors">
                Request a Quote
              </button>
              <button onClick={() => setPage('contact')} className="px-7 py-3.5 rounded-lg bg-[#0c1e26]/30 backdrop-blur border border-white/30 text-white font-bold hover:bg-[#0c1e26]/50 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
