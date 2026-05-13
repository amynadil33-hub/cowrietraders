import React, { useState } from 'react';
import Header, { Page } from './cowrie/Header';
import Footer from './cowrie/Footer';
import HomePage from './cowrie/HomePage';
import ImportPage from './cowrie/ImportPage';
import ExportPage from './cowrie/ExportPage';
import ProductsPage from './cowrie/ProductsPage';
import QuotePage from './cowrie/QuotePage';
import FreightPage from './cowrie/FreightPage';
import ContactPage from './cowrie/ContactPage';

const AppLayout: React.FC = () => {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header page={page} setPage={setPage} />
      <main className="flex-1">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'import' && <ImportPage setPage={setPage} />}
        {page === 'export' && <ExportPage setPage={setPage} />}
        {page === 'products' && <ProductsPage setPage={setPage} />}
        {page === 'service' && <QuotePage />}
        {page === 'freight' && <FreightPage setPage={setPage} />}
        {page === 'contact' && <ContactPage />}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
};

export default AppLayout;
