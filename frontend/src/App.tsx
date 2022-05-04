import React from 'react';
import { Checkout } from './pages/Checkout/Checkout';
import { Header } from './layout/Header';

function App() {
  return (
    <>
      <Header />
      <main className="page-content">
        <Checkout />
      </main>
    </>
  );
}

export default App;
