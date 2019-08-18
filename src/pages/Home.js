import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

const Home = () => {
  return (
    <>
      <Hero>
        <Banner title="Luxurious Rooms" subtitle="deluxe rooms starting at $199">
          <Link to="/rooms" className="btn-primary">Rooms</Link>
        </Banner>
      </Hero>
      <Services/>
      <FeaturedRooms/>
    </>
  );
};

export default Home;