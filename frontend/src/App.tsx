import React from 'react';
import { Checkout } from './pages/Checkout';
import { Header } from './layout/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Checkout />
      </main>
    </>
  );
}

export default App;
