import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Send } from 'lucide-react';
import type { Page } from './Header';

export default function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('sending');
    try {
      await fetch('https://famous.ai/api/crm/6a02246ac2e566a83616a38d/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'footer-signup',
          tags: ['newsletter', 'cowrie-traders'],
        }),
      });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <footer className="bg-[#0c1e26] text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1BA098] to-[#0F7F78] flex items-center justify-center text-white font-extrabold">C</div>
            <div>
              <div className="text-white font-extrabold text-lg">Cowrie Traders</div>
              <div className="text-xs uppercase tracking-widest text-[#F4E4C1]">Maldives</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 max-w-md">
            Cowrie Traders is a Maldivian import and export company specialising in international
            trade, product sourcing, freight and logistics. We connect Maldivian businesses to the
            world — and bring premium Maldivian marine products to global markets.
          </p>
          <form onSubmit={subscribe} className="mt-6 flex gap-2 max-w-sm">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Subscribe for trade updates"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]"
            />
            <button className="px-4 py-2.5 rounded-lg bg-[#1BA098] hover:bg-[#0F7F78] text-white text-sm font-semibold flex items-center gap-1.5">
              <Send size={14} /> Join
            </button>
          </form>
          {status === 'done' && <p className="text-xs text-[#1BA098] mt-2">Subscribed successfully.</p>}
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { k: 'home' as Page, l: 'Home' },
              { k: 'import' as Page, l: 'Import' },
              { k: 'export' as Page, l: 'Export' },
              { k: 'products' as Page, l: 'Products' },
              { k: 'service' as Page, l: 'Customer Service' },
              { k: 'freight' as Page, l: 'Freight & Logistics' },
              { k: 'contact' as Page, l: 'Contact Us' },
            ].map((l) => (
              <li key={l.k}>
                <button onClick={() => go(l.k)} className="hover:text-[#1BA098] transition-colors">{l.l}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Branches</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><div className="text-white font-semibold">Head Office</div>Malé, Maldives</li>
            <li><div className="text-white font-semibold">Operations</div>Hulhumalé, Maldives</li>
            <li><div className="text-white font-semibold">Logistics</div>Malé Port Area</li>
            <li><div className="text-white font-semibold">Sourcing Desk</div>Singapore liaison</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={15} className="text-[#1BA098] mt-0.5 shrink-0" /><span>Malé, Republic of Maldives</span></li>
            <li className="flex items-start gap-2"><Phone size={15} className="text-[#1BA098] mt-0.5 shrink-0" /><span>+960 333 0000</span></li>
            <li className="flex items-start gap-2"><Mail size={15} className="text-[#1BA098] mt-0.5 shrink-0" /><span>info@cowrietraders.mv</span></li>
          </ul>
          <div className="flex gap-3 mt-5">
            {[Facebook, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1BA098] flex items-center justify-center transition-colors">
                <Icon size={16} className="text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Cowrie Traders Pvt Ltd. All rights reserved.</span>
          <span>Republic of Maldives · Established 2014</span>
        </div>
      </div>
    </footer>
  );
}
