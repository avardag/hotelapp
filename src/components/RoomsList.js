import React from 'react';
import Room from './Room';

const RoomsList = ({rooms}) => {
  if(rooms.length === 0){
    return (
      <div className="empty-search">
        <h3>Unfortunately, no rooms matched your search</h3>
      </div>
    )
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {
          rooms.map((item)=>(
            <Room room={item} key={item.id}/>
          ))
        }
      </div>
    </section>
  );
};

export default RoomsList;