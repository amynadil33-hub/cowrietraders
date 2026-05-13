import React, { useEffect, useState } from 'react';
import { Branch, fetchBranches, BRANCHES_FALLBACK } from '@/lib/cowrieData';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [branches, setBranches] = useState<Branch[]>(BRANCHES_FALLBACK);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchBranches().then(setBranches);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes('@') || !form.name) return;
    setSending(true);
    try {
      await fetch('https://famous.ai/api/crm/6a02246ac2e566a83616a38d/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          source: 'contact-form',
          tags: ['contact-form', 'cowrie-traders'],
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-[#0c1e26] via-[#0F7F78] to-[#1BA098] text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4E4C1]/20 text-[#F4E4C1] text-xs font-semibold uppercase tracking-widest mb-4">Contact</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">Get in touch</h1>
          <p className="text-white/85 max-w-2xl">We respond to every enquiry — typically within one business day.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-7">
            <h2 className="text-xl font-extrabold text-[#1F2A37] mb-1">Send us a message</h2>
            <p className="text-sm text-slate-500 mb-6">Tell us about your trade enquiry and our team will get back to you.</p>

            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-emerald-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#1F2A37] mb-2">Message received</h3>
                <p className="text-slate-600">Thank you for contacting Cowrie Traders. We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]" />
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]" />
                </div>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]" />
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]" />
                <button type="submit" disabled={sending} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-60">
                  <Send size={16} /> {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-[#0c1e26] to-[#0F7F78] rounded-2xl p-7 text-white">
              <h3 className="font-extrabold text-lg mb-4">Company contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3"><MapPin size={16} className="text-[#F4E4C1] mt-0.5" /> Malé, Republic of Maldives</li>
                <li className="flex items-start gap-3"><Phone size={16} className="text-[#F4E4C1] mt-0.5" /> +960 333 0000</li>
                <li className="flex items-start gap-3"><Mail size={16} className="text-[#F4E4C1] mt-0.5" /> info@cowrietraders.mv</li>
                <li className="flex items-start gap-3"><Clock size={16} className="text-[#F4E4C1] mt-0.5" /> Sun–Thu, 8:30 AM – 5:00 PM</li>
              </ul>
            </div>
            <div className="bg-[#F4E4C1] rounded-2xl p-7">
              <h3 className="font-extrabold text-lg text-[#0F7F78] mb-2">WhatsApp support</h3>
              <p className="text-sm text-slate-700 mb-3">Chat with our customer service team directly via WhatsApp.</p>
              <a href="https://wa.me/9603330000" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2.5 rounded-lg bg-[#0F7F78] text-white font-semibold text-sm hover:bg-[#0c1e26] transition-colors">
                Open WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-widest text-[#8B7BA8] uppercase mb-3">Our Offices</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1F2A37]">Branch offices</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {branches.map((b) => (
              <div key={b.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#1BA098]/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#1BA098]/15 flex items-center justify-center mb-3">
                  <MapPin size={18} className="text-[#1BA098]" />
                </div>
                <h3 className="font-extrabold text-[#1F2A37]">{b.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{b.location}</p>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2"><Phone size={12} className="text-[#0F7F78]" /> {b.phone}</div>
                  <div className="flex items-center gap-2"><Mail size={12} className="text-[#0F7F78]" /> {b.email}</div>
                  <div className="flex items-center gap-2"><Clock size={12} className="text-[#0F7F78]" /> {b.office_hours}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
