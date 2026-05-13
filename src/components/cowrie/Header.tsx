import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { IMAGES } from '@/lib/cowrieData';

type Page = 'home' | 'import' | 'export' | 'products' | 'service' | 'freight' | 'contact';

const NAV: { key: Page; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'import', label: 'Import' },
  { key: 'export', label: 'Export' },
  { key: 'products', label: 'Products' },
  { key: 'service', label: 'Customer Service' },
  { key: 'freight', label: 'Freight & Logistics' },
  { key: 'contact', label: 'Contact Us' },
];

export default function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);

  const go = (p: Page) => {
    setPage(p);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden md:block bg-[#0F7F78] text-white text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <span className="opacity-90">Connecting the Maldives to global trade since 2014</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone size={12} /> +960 333 0000</span>
            <span>info@cowrietraders.mv</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => go('home')} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1BA098] to-[#0F7F78] flex items-center justify-center shadow-md overflow-hidden">
                <img src={IMAGES.logo} alt="Cowrie Traders" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <div className="font-extrabold text-lg leading-tight text-[#1F2A37] tracking-tight">Cowrie Traders</div>
                <div className="text-[11px] uppercase tracking-widest text-[#8B7BA8] font-semibold">Import · Export · Logistics</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((n) => (
                <button
                  key={n.key}
                  onClick={() => go(n.key)}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                    page === n.key
                      ? 'text-[#1BA098] bg-[#1BA098]/8'
                      : 'text-slate-700 hover:text-[#1BA098]'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => go('service')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                Request a Quote
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 text-slate-700"
                aria-label="Toggle menu"
              >
                {open ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-slate-100 bg-white">
            <div className="px-4 py-3 space-y-1">
              {NAV.map((n) => (
                <button
                  key={n.key}
                  onClick={() => go(n.key)}
                  className={`block w-full text-left px-3 py-2.5 rounded-md font-medium ${
                    page === n.key ? 'bg-[#1BA098]/10 text-[#1BA098]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export type { Page };
