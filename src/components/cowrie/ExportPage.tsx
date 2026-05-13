import React from 'react';
import { IMAGES } from '@/lib/cowrieData';
import type { Page } from './Header';
import { Fish, Snowflake, Wind, BadgeCheck, ArrowRight, Anchor } from 'lucide-react';

const exportCats = [
  { t: 'Fresh Tuna', d: 'Premium yellowfin tuna harvested with line-caught methods.', img: IMAGES.tuna },
  { t: 'Frozen Tuna', d: 'Frozen skipjack tuna and tuna loins for international buyers.', img: IMAGES.tuna },
  { t: 'Dried Tuna', d: 'Traditional Maldivian dried tuna (Valhomas), prepared to export standards.', img: IMAGES.driedTuna },
  { t: 'Grouper', d: 'Premium reef grouper, fresh or frozen, packed for export.', img: IMAGES.grouper },
  { t: 'Reef Fish', d: 'Assorted Maldivian reef fish, supplied on customer request.', img: IMAGES.grouper },
  { t: 'Sea Cucumber', d: 'Processed Maldivian sea cucumber for Asian and global markets.', img: IMAGES.tuna },
];

const sections = [
  {
    icon: Fish, t: 'Maldivian Marine Products',
    d: 'Cowrie Traders works directly with licensed Maldivian fishermen and processors to supply a full range of marine products to international buyers.',
  },
  {
    icon: Snowflake, t: 'Fresh and Frozen Tuna Supply',
    d: 'Daily availability of fresh yellowfin tuna and bulk frozen skipjack tuna, loins and steaks — packed and shipped according to buyer specifications.',
  },
  {
    icon: Wind, t: 'Dried and Value-Added Products',
    d: 'Traditional dried tuna and value-added marine products processed under hygienic, export-compliant conditions.',
  },
  {
    icon: BadgeCheck, t: 'Quality, Handling and Export Standards',
    d: 'HACCP-aligned handling, full cold chain support, and complete export documentation including health and origin certificates.',
  },
];

export default function ExportPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-[#0c1e26] to-[#0F7F78] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${IMAGES.tuna})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1e26]/85 to-[#0F7F78]/70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4E4C1]/20 text-[#F4E4C1] text-xs font-semibold uppercase tracking-widest mb-5">Export Services</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-3xl">Premium Maldivian marine exports</h1>
          <p className="text-white/85 max-w-2xl text-lg">
            From the pristine waters of the Maldives to your processing facility or distributor —
            fresh, frozen and dried tuna, grouper, reef fish and sea cucumber, supplied to
            international export standards.
          </p>
        </div>
      </section>

      {/* Export Categories grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">Export Products</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37]">Main export categories</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportCats.map((c) => (
              <div key={c.t} className="rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="h-44 overflow-hidden">
                  <img src={c.img} alt={c.t} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Anchor size={14} className="text-[#1BA098]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1BA098]">Maldives Export</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-[#1F2A37] mb-1.5">{c.t}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail sections */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((s) => (
              <div key={s.t} className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex gap-5">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-[#1BA098] to-[#0F7F78] flex items-center justify-center">
                    <s.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#1F2A37] mb-2">{s.t}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom orders */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#1BA098] to-[#0F7F78] p-10 md:p-12 text-white text-center shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Export availability & custom orders</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Request export availability and pricing for any of our marine products. We accept
              custom packaging, sizing and labelling for established international buyers.
            </p>
            <button onClick={() => setPage('service')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#0F7F78] font-bold hover:bg-[#F4E4C1] transition-colors">
              Request Export Availability & Pricing <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
