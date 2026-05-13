import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { IMAGES } from '@/lib/cowrieData';
import {
  Lock, LogOut, Search, RefreshCcw, Mail, Phone, MapPin, Calendar, Package,
  ShieldAlert, ChevronRight, X, Save, Loader2, UserPlus,
} from 'lucide-react';

type Status = 'new' | 'in-progress' | 'quoted' | 'closed';

type QR = {
  id: string;
  created_at: string;
  trade_type: 'import' | 'export';
  quantity: number;
  delivery_location: string | null;
  customer_name: string;
  company_name: string | null;
  email: string;
  phone: string | null;
  notes: string | null;
  admin_notes: string | null;
  status: Status;
  preferred_delivery_date: string | null;
  product_id: string | null;
  product_category_id: string | null;
  origin_country_id: string | null;
  destination_country_id: string | null;
  unit_id: string | null;
  // Joined
  product_name?: string;
  category_name?: string;
  origin_name?: string;
  destination_name?: string;
  unit_name?: string;
};

const STATUS_META: Record<Status, { label: string; cls: string }> = {
  'new':         { label: 'New',         cls: 'bg-sky-100 text-sky-700 border-sky-200' },
  'in-progress': { label: 'In Progress', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
  'quoted':      { label: 'Quoted',      cls: 'bg-violet-100 text-violet-700 border-violet-200' },
  'closed':      { label: 'Closed',      cls: 'bg-slate-200 text-slate-700 border-slate-300' },
};

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      checkAdmin(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      checkAdmin(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const checkAdmin = async (s: any) => {
    setChecking(true);
    if (!s?.user) { setIsAdmin(false); setChecking(false); return; }
    const { data } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', s.user.id)
      .maybeSingle();
    setIsAdmin(!!data);
    setChecking(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#1BA098]" />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Login />;
  }

  return <Dashboard email={session.user.email} />;
}

/* ---------------- Login ---------------- */

function Login() {
  const [mode, setMode] = useState<'signin' | 'bootstrap'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setInfo(null); setBusy(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // onAuthStateChange will refresh
      } else {
        const res = await fetch(
          `https://${import.meta.env.VITE_SUPABASE_PROJECT_REF || ''}.supabase.co/functions/v1/admin-bootstrap`,
          { method: 'POST' } // fallback path; supabase.functions.invoke is safer
        ).catch(() => null);
        // Use supabase invoke
        const { data, error } = await supabase.functions.invoke('admin-bootstrap', {
          body: { email, password },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        setInfo('Admin account created. You can now sign in.');
        setMode('signin');
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(135deg,#0c1e26 0%,#0F7F78 70%,#1BA098 100%)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur overflow-hidden flex items-center justify-center">
              <img src={IMAGES.logo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <div className="font-extrabold text-lg">Cowrie Traders</div>
              <div className="text-xs uppercase tracking-widest text-[#F4E4C1]">Admin Portal</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-white/20 p-7">
          <div className="flex items-center gap-2 mb-5">
            {mode === 'signin'
              ? <Lock size={18} className="text-[#1BA098]" />
              : <UserPlus size={18} className="text-[#1BA098]" />}
            <h1 className="text-xl font-extrabold text-[#1F2A37]">
              {mode === 'signin' ? 'Staff sign in' : 'Create admin account'}
            </h1>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Email</label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]"
                placeholder="admin@cowrietraders.mv"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Password</label>
              <input
                type="password" required minLength={6} value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]"
                placeholder="At least 6 characters"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {info && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">{info}</div>
            )}

            <button
              type="submit" disabled={busy}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              {mode === 'signin' ? 'Sign in' : 'Create admin'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            {mode === 'signin' ? (
              <button onClick={() => { setMode('bootstrap'); setError(null); setInfo(null); }} className="text-[#1BA098] font-semibold hover:underline">
                First time? Create the initial admin account
              </button>
            ) : (
              <button onClick={() => { setMode('signin'); setError(null); setInfo(null); }} className="text-[#1BA098] font-semibold hover:underline">
                Already have an account? Sign in
              </button>
            )}
          </div>
          <p className="mt-3 text-center text-[11px] text-slate-400">
            Once an admin exists, creating additional admins requires an active admin session.
          </p>
        </div>

        <p className="text-center text-xs text-white/70 mt-5">
          Restricted area. Authorised staff only.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */

function Dashboard({ email }: { email: string }) {
  const [requests, setRequests] = useState<QR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all');
  const [tradeFilter, setTradeFilter] = useState<'all' | 'import' | 'export'>('all');
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<QR | null>(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select(`
          *,
          products (name),
          product_categories (name),
          units (name, abbreviation),
          origin:countries!quote_requests_origin_country_id_fkey (name),
          destination:countries!quote_requests_destination_country_id_fkey (name)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      const mapped: QR[] = (data || []).map((r: any) => ({
        ...r,
        product_name: r.products?.name,
        category_name: r.product_categories?.name,
        unit_name: r.units ? `${r.units.name} (${r.units.abbreviation})` : null,
        origin_name: r.origin?.name,
        destination_name: r.destination?.name,
      }));
      setRequests(mapped);
    } catch (e: any) {
      setError(e.message || 'Failed to load requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (tradeFilter !== 'all' && r.trade_type !== tradeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = [
          r.customer_name, r.company_name, r.email, r.phone, r.product_name,
          r.category_name, r.delivery_location, r.origin_name, r.destination_name,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [requests, statusFilter, tradeFilter, search]);

  const counts = useMemo(() => {
    const c = { new: 0, 'in-progress': 0, quoted: 0, closed: 0 } as Record<Status, number>;
    requests.forEach((r) => { c[r.status] = (c[r.status] || 0) + 1; });
    return c;
  }, [requests]);

  const updateRequest = async (id: string, patch: Partial<QR>) => {
    const { data, error } = await supabase
      .from('quote_requests')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select(`
        *,
        products (name),
        product_categories (name),
        units (name, abbreviation),
        origin:countries!quote_requests_origin_country_id_fkey (name),
        destination:countries!quote_requests_destination_country_id_fkey (name)
      `)
      .single();
    if (error) throw error;
    const updated: QR = {
      ...data,
      product_name: (data as any).products?.name,
      category_name: (data as any).product_categories?.name,
      unit_name: (data as any).units ? `${(data as any).units.name} (${(data as any).units.abbreviation})` : null,
      origin_name: (data as any).origin?.name,
      destination_name: (data as any).destination?.name,
    };
    setRequests((rs) => rs.map((r) => (r.id === id ? updated : r)));
    if (active?.id === id) setActive(updated);
  };

  const signOut = () => supabase.auth.signOut();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1BA098] to-[#0F7F78] overflow-hidden flex items-center justify-center">
              <img src={IMAGES.logo} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-[#1F2A37] leading-tight">Cowrie Traders</div>
              <div className="text-[10px] uppercase tracking-widest text-[#8B7BA8] font-bold">Admin Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-slate-600">{email}</span>
            <a href="/" className="text-sm text-slate-600 hover:text-[#1BA098]">View site</a>
            <button onClick={signOut} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2A37]">Quote requests</h1>
            <p className="text-sm text-slate-500 mt-1">Review, triage and respond to customer quotations.</p>
          </div>
          <button onClick={load} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50">
            <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {(['new','in-progress','quoted','closed'] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              className={`text-left bg-white rounded-2xl border p-5 transition-all ${
                statusFilter === s ? 'border-[#1BA098] shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{STATUS_META[s].label}</div>
              <div className="text-3xl font-extrabold text-[#1F2A37] mt-1">{counts[s] || 0}</div>
              <div className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_META[s].cls}`}>
                {STATUS_META[s].label}
              </div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 grid sm:grid-cols-[1fr_auto_auto] gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, company, email, product, location…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In progress</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>
          <select value={tradeFilter} onChange={(e) => setTradeFilter(e.target.value as any)} className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
            <option value="all">All trade types</option>
            <option value="import">Import</option>
            <option value="export">Export</option>
          </select>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-lg p-3 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Qty</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                    <Loader2 className="animate-spin inline" size={18} /> Loading requests…
                  </td></tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                    No quote requests match your filters.
                  </td></tr>
                )}
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 cursor-pointer" onClick={() => setActive(r)}>
                    <td className="px-5 py-3 text-slate-600 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString()}
                      <div className="text-xs text-slate-400">{new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-semibold text-[#1F2A37]">{r.customer_name}</div>
                      <div className="text-xs text-slate-500">{r.company_name || r.email}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-slate-800">{r.product_name || r.category_name || '—'}</div>
                      <div className="text-xs text-slate-500">
                        {r.trade_type === 'import' ? `From ${r.origin_name || '—'}` : `To ${r.destination_name || '—'}`}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.trade_type === 'export' ? 'bg-[#1BA098]/15 text-[#0F7F78]' : 'bg-[#8B7BA8]/15 text-[#6E5F8A]'}`}>
                        {r.trade_type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-700">{r.quantity} {r.unit_name?.match(/\(([^)]+)\)/)?.[1] || ''}</td>
                    <td className="px-5 py-3">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <ChevronRight size={16} className="text-slate-400 inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {active && (
        <RequestDrawer
          req={active}
          onClose={() => setActive(null)}
          onUpdate={updateRequest}
        />
      )}
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const m = STATUS_META[status];
  return (
    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border ${m.cls}`}>
      {m.label}
    </span>
  );
}

/* ---------------- Drawer ---------------- */

function RequestDrawer({
  req, onClose, onUpdate,
}: {
  req: QR;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<QR>) => Promise<void>;
}) {
  const [status, setStatus] = useState<Status>(req.status);
  const [notes, setNotes] = useState(req.admin_notes || '');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setStatus(req.status);
    setNotes(req.admin_notes || '');
  }, [req.id]);

  const dirty = status !== req.status || notes !== (req.admin_notes || '');

  const save = async () => {
    setSaving(true);
    try {
      await onUpdate(req.id, { status, admin_notes: notes });
      setSavedAt(Date.now());
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
      <aside
        className="relative w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quote Request</div>
            <h2 className="text-lg font-extrabold text-[#1F2A37]">{req.customer_name}</h2>
            <div className="text-xs text-slate-500 mt-0.5">
              Received {new Date(req.created_at).toLocaleString()}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Status</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['new','in-progress','quoted','closed'] as Status[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                    status === s
                      ? `${STATUS_META[s].cls} ring-2 ring-offset-1 ring-[#1BA098]`
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {STATUS_META[s].label}
                </button>
              ))}
            </div>
          </section>

          {/* Customer */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Customer</h3>
            <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
              <Row label="Name" value={req.customer_name} />
              <Row label="Company" value={req.company_name || '—'} />
              <Row label="Email" value={<a href={`mailto:${req.email}`} className="text-[#1BA098] hover:underline flex items-center gap-1"><Mail size={12} />{req.email}</a>} />
              <Row label="Phone" value={req.phone ? <a href={`tel:${req.phone}`} className="text-[#1BA098] hover:underline flex items-center gap-1"><Phone size={12} />{req.phone}</a> : '—'} />
            </div>
          </section>

          {/* Request details */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Request details</h3>
            <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
              <Row label="Trade type" value={
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${req.trade_type === 'export' ? 'bg-[#1BA098]/15 text-[#0F7F78]' : 'bg-[#8B7BA8]/15 text-[#6E5F8A]'}`}>
                  {req.trade_type.toUpperCase()}
                </span>
              } />
              <Row label="Category" value={req.category_name || '—'} />
              <Row label="Product" value={<span className="flex items-center gap-1"><Package size={12} />{req.product_name || '—'}</span>} />
              <Row label="Origin" value={<span className="flex items-center gap-1"><MapPin size={12} />{req.origin_name || '—'}</span>} />
              <Row label="Destination" value={<span className="flex items-center gap-1"><MapPin size={12} />{req.destination_name || '—'}</span>} />
              <Row label="Quantity" value={`${req.quantity} ${req.unit_name || ''}`} />
              <Row label="Delivery date" value={req.preferred_delivery_date
                ? <span className="flex items-center gap-1"><Calendar size={12} />{new Date(req.preferred_delivery_date).toLocaleDateString()}</span>
                : '—'} />
              <Row label="Delivery location" value={req.delivery_location || '—'} />
            </div>
          </section>

          {/* Customer notes */}
          {req.notes && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Customer notes</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap">
                {req.notes}
              </div>
            </section>
          )}

          {/* Admin notes */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Internal admin notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Track quoted pricing, supplier replies, follow-up dates…"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA098]"
            />
            <p className="text-[11px] text-slate-400 mt-1">Visible to admin staff only.</p>
          </section>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              {savedAt && !dirty && <span className="text-emerald-600 font-semibold">Saved</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50">
                Close
              </button>
              <button
                onClick={save}
                disabled={!dirty || saving}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#1BA098] to-[#0F7F78] text-white font-semibold text-sm shadow-md disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save changes
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
      <div className="text-sm text-[#1F2A37] text-right">{value}</div>
    </div>
  );
}
