import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';

const Rooms = () => {
  return (
    <div>
      <Hero hero="roomsHero">
        <Banner title="Our Rooms">
          <Link to="/" className="btn-primary">Return Home</Link>
        </Banner>
      </Hero>
    </div>
  );
};

export default Rooms;