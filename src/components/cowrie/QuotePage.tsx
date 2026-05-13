import React, { useEffect, useMemo, useState } from 'react';
import {
  fetchCategories, fetchCountries, fetchProducts,
  submitQuoteRequest, Category, Country, Product, CUSTOMER_SERVICE_TOPICS,
} from '@/lib/cowrieData';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Upload, MessageCircle, Mail, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';

type Unit = { id: string; name: string; abbreviation: string };

export default function QuotePage() {
  const [step, setStep] = useState<'form' | 'review' | 'done'>('form');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  // Form state
  const [tradeType, setTradeType] = useState<'import' | 'export'>('import');
  const [categoryId, setCategoryId] = useState('');
  const [productId, setProductId] = useState('');
  const [originId, setOriginId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitId, setUnitId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    (async () => {
      const [cats, cos, prods] = await Promise.all([fetchCategories(), fetchCountries(), fetchProducts()]);
      setCategories(cats); setCountries(cos); setProducts(prods);
      try {
        const { data } = await supabase.from('units').select('*');
        setUnits(data || []);
      } catch { /* ignore */ }
    })();
  }, []);

  const filteredCategories = useMemo(
    () => categories.filter((c) => c.type === tradeType || c.type === 'both'),
    [categories, tradeType]
  );
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.trade_type === tradeType);
    if (categoryId) list = list.filter((p) => p.category_id === categoryId);
    if (originId && tradeType === 'import') list = list.filter((p) => !p.origin_country_id || p.origin_country_id === originId);
    return list;
  }, [products, tradeType, categoryId, originId]);

  const selectedProduct = products.find((p) => p.id === productId);
  const selectedCategory = categories.find((c) => c.id === categoryId);
  const selectedOrigin = countries.find((c) => c.id === originId);
  const selectedDest = countries.find((c) => c.id === destinationId);
  const selectedUnit = units.find((u) => u.id === unitId);

  const canReview = !!(quantity && customerName && email && (unitId || true));

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await submitQuoteRequest({
        trade_type: tradeType,
        product_category_id: categoryId || null,
        product_id: productId || null,
        origin_country_id: tradeType === 'import' ? (originId || null) : null,
        destination_country_id: tradeType === 'export' ? (destinationId || null) : null,
        quantity: Number(quantity),
        unit_id: unitId || null,
        preferred_delivery_date: deliveryDate || null,
        delivery_location: deliveryLocation,
        customer_name: customerName,
        company_name: companyName,
        email,
        phone,
        notes,
      });
      setStep('done');
    } catch (e: any) {
      setError(e.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'done') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-slate-50">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-5">
            <CheckCircle2 className="text-emerald-600" size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1F2A37] mb-3">Thank you!</h2>
          <p className="text-slate-600 mb-6">
            Your quotation request has been received. Our customer service team will contact you shortly.
          </p>
          <button
            onClick={() => {
              // reset
              setStep('form'); setTradeType('import'); setCategoryId(''); setProductId('');
              setOriginId(''); setDestinationId(''); setQuantity(''); setUnitId('');
              setDeliveryDate(''); setDeliveryLocation(''); setCustomerName(''); setCompanyName('');
              setEmail(''); setPhone(''); setNotes(''); setFileName('');
            }}
            className="px-6 py-3 rounded-lg bg-[#1BA098] text-white font-semibold hover:bg-[#0F7F78] transition-colors"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0c1e26] via-[#0F7F78] to-[#1BA098] text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F4E4C1]/20 text-[#F4E4C1] text-xs font-semibold uppercase tracking-widest mb-4">Customer Service Portal</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">Request a Quotation</h1>
          <p className="text-white/85 max-w-2xl">Tell us what you need to import or export. We will reply with availability, pricing and shipping options — usually within one business day.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        {/* Form / Review */}
        <div className="lg:col-span-2">
          {step === 'form' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h2 className="text-xl font-extrabold text-[#1F2A37] mb-1">Quotation details</h2>
              <p className="text-sm text-slate-500 mb-6">Fields marked with * are required.</p>

              {/* Trade type toggle */}
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Product Type *</label>
              <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
                {(['import', 'export'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { setTradeType(t); setCategoryId(''); setProductId(''); }}
                    className={`py-2.5 rounded-lg font-semibold text-sm transition-all ${
                      tradeType === t ? 'bg-white shadow text-[#0F7F78]' : 'text-slate-600 hover:text-[#0F7F78]'
                    }`}
                  >
                    {t === 'import' ? 'Import Request' : 'Export Request'}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Product Category">
                  <select value={categoryId} onChange={(e) => { setCategoryId(e.target.value); setProductId(''); }} className="ct-input">
                    <option value="">Select a category</option>
                    {filteredCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </Field>
                <Field label="Specific Product">
                  <select value={productId} onChange={(e) => setProductId(e.target.value)} className="ct-input">
                    <option value="">Select a product</option>
                    {filteredProducts.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </Field>

                {tradeType === 'import' ? (
                  <Field label="Origin Country">
                    <select value={originId} onChange={(e) => setOriginId(e.target.value)} className="ct-input">
                      <option value="">Select origin</option>
                      {countries.filter((c) => c.is_import_origin).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </Field>
                ) : (
                  <Field label="Destination Country">
                    <select value={destinationId} onChange={(e) => setDestinationId(e.target.value)} className="ct-input">
                      <option value="">Select destination</option>
                      {countries.filter((c) => c.name !== 'Maldives').map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </Field>
                )}

                <Field label="Preferred Delivery Date">
                  <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="ct-input" />
                </Field>

                <Field label="Quantity *">
                  <input type="number" min="0" step="any" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="ct-input" placeholder="e.g. 50" />
                </Field>
                <Field label="Unit">
                  <select value={unitId} onChange={(e) => setUnitId(e.target.value)} className="ct-input">
                    <option value="">Select unit</option>
                    {units.map((u) => <option key={u.id} value={u.id}>{u.name} ({u.abbreviation})</option>)}
                  </select>
                </Field>

                <Field label="Delivery Location / Island / Port" full>
                  <input value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} className="ct-input" placeholder="e.g. Malé Commercial Harbour, Hulhumalé, Addu City" />
                </Field>

                <Field label="Customer Name *">
                  <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="ct-input" placeholder="Your full name" />
                </Field>
                <Field label="Company Name">
                  <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="ct-input" placeholder="Company / business" />
                </Field>

                <Field label="Email *">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="ct-input" placeholder="you@company.com" />
                </Field>
                <Field label="Phone / WhatsApp">
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className="ct-input" placeholder="+960 ..." />
                </Field>

                <Field label="Additional Notes" full>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="ct-input" placeholder="Specifications, packaging, certifications, target price…" />
                </Field>

                <Field label="Attach File (specification / purchase list)" full>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-slate-200 text-sm text-slate-500 hover:border-[#1BA098] cursor-pointer transition-colors">
                    <Upload size={16} />
                    <span>{fileName || 'Click to upload (optional)'}</span>
                    <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                  </label>
                </Field>
              </div>

              <style>{`.ct-input{width:100%;padding:0.65rem 0.85rem;border:1px solid #e2e8f0;border-radius:0.5rem;font-size:0.875rem;background:white;outline:none;transition:all 0.15s}.ct-input:focus{border-color:#1BA098;box-shadow:0 0 0 3px rgba(27,160,152,0.15)}`}</style>

              <div className="mt-7 flex justify-end">
                <button
                  onClick={() => setStep('review')}
                  disabled={!canReview}
                  className="px-7 py-3 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Review Request <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h2 className="text-xl font-extrabold text-[#1F2A37] mb-1">Review your request</h2>
              <p className="text-sm text-slate-500 mb-6">Please confirm the details below before submitting.</p>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                <Summary label="Trade Type" value={tradeType === 'import' ? 'Import' : 'Export'} />
                <Summary label="Category" value={selectedCategory?.name || '—'} />
                <Summary label="Product" value={selectedProduct?.name || '—'} />
                <Summary label={tradeType === 'import' ? 'Origin' : 'Destination'} value={(tradeType === 'import' ? selectedOrigin?.name : selectedDest?.name) || '—'} />
                <Summary label="Quantity" value={`${quantity} ${selectedUnit?.abbreviation || ''}`} />
                <Summary label="Delivery Date" value={deliveryDate || '—'} />
                <Summary label="Delivery Location" value={deliveryLocation || '—'} />
                <Summary label="File" value={fileName || '—'} />
                <Summary label="Customer Name" value={customerName} />
                <Summary label="Company" value={companyName || '—'} />
                <Summary label="Email" value={email} />
                <Summary label="Phone" value={phone || '—'} />
                {notes && <Summary label="Notes" value={notes} full />}
              </div>

              {error && <div className="text-sm text-rose-600 mb-3">{error}</div>}

              <div className="flex flex-wrap gap-3 justify-end">
                <button onClick={() => setStep('form')} className="px-5 py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">
                  Edit
                </button>
                <button onClick={submit} disabled={submitting} className="px-7 py-3 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-60">
                  {submitting ? 'Submitting…' : 'Submit Quotation Request'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-extrabold text-[#1F2A37] mb-4">Customer service</h3>
            <ul className="space-y-3">
              {CUSTOMER_SERVICE_TOPICS.map((t) => (
                <li key={t.title} className="flex gap-3">
                  <ShieldCheck size={16} className="text-[#1BA098] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[#1F2A37]">{t.title}</div>
                    <div className="text-xs text-slate-500">{t.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#F4E4C1] to-[#E9D2A0] rounded-2xl p-6">
            <Headphones size={22} className="text-[#0F7F78] mb-3" />
            <h3 className="font-extrabold text-[#1F2A37] mb-2">Need help right now?</h3>
            <p className="text-sm text-slate-700 mb-4">Reach our customer service team by phone, WhatsApp or email.</p>
            <div className="space-y-2 text-sm">
              <a href="tel:+9603330000" className="flex items-center gap-2 text-[#0F7F78] font-semibold hover:underline"><MessageCircle size={14} /> +960 333 0000</a>
              <a href="mailto:info@cowrietraders.mv" className="flex items-center gap-2 text-[#0F7F78] font-semibold hover:underline"><Mail size={14} /> info@cowrietraders.mv</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function Summary({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="text-sm text-[#1F2A37] font-medium mt-0.5">{value}</div>
    </div>
  );
}
