import React from 'react';
import { FREIGHT_SERVICES, IMAGES } from '@/lib/cowrieData';
import type { Page } from './Header';
import { Ship, Plane, FileCheck, Anchor, Truck, Snowflake, FileText, ArrowRight } from 'lucide-react';

const ICONS: Record<string, any> = {
  'Sea Freight': Ship,
  'Air Freight': Plane,
  'Customs Support': FileCheck,
  'Port Handling': Anchor,
  'Island Delivery': Truck,
  'Cold Chain': Snowflake,
  'Documentation': FileText,
};

export default function FreightPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-[#0c1e26] to-[#0F7F78] text-white py-20">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${IMAGES.port})`, backgroundSize: 'cover' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1e26]/85 to-[#0F7F78]/60" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4E4C1]/20 text-[#F4E4C1] text-xs font-semibold uppercase tracking-widest mb-5">Freight & Logistics</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-3xl">End-to-end freight and logistics</h1>
          <p className="text-white/85 max-w-2xl text-lg">
            Sea and air freight, customs clearance, cold chain support and local island delivery —
            we handle the full logistics chain so you can focus on your business.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">Our Services</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37]">Comprehensive logistics solutions</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREIGHT_SERVICES.map((s) => {
              const Icon = ICONS[s.name] || Ship;
              return (
                <div key={s.name} className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-[#1BA098]/30 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1BA098] to-[#0F7F78] flex items-center justify-center mb-5">
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#1F2A37] mb-2">{s.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#1BA098] to-[#0F7F78] p-10 md:p-12 text-white text-center shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Get a logistics quotation</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">Whether it is a single carton or a full container, we can plan the best route for your cargo.</p>
            <button onClick={() => setPage('service')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#0F7F78] font-bold hover:bg-[#F4E4C1] transition-colors">
              Request a Quote <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
