import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReservationList } from './pages/ReservationList';
import { Checkout } from './pages/Checkout';
import { Header } from './layout/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ReservationList />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
