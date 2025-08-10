import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SeatLayout from './pages/SeatLayout';
import MyBooking from './pages/MyBooking';
import Favorite from './pages/Favorite';
import Movies from './pages/Movies';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Navbar from './components/Navbar'; // Thêm import Navbar

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetail />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-booking' element={<MyBooking />} />
        <Route path='/favorite' element={<Favorite />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
