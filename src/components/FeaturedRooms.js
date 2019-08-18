import React, { Component } from 'react';
import { RoomContext, RoomConsumer } from '../context';

class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    const value = this.context;
    return (
      <div>
        <p>{value.name}</p>
      </div>
    );
  }
}

export default FeaturedRooms;