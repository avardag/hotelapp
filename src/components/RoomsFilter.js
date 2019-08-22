import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';

//gets unique values of array of objs
const getUnique = (items, value)=>{
  const valuesArr = items.map(item=>item[value])
  return [...new Set(valuesArr)];
}

const RoomsFilter = (props) => {
  const context = useContext(RoomContext);
  
  //get unique room types
  let uniqueRoomTypes = getUnique(props.rooms, 'type');
  //add 'all' type to room types arr
  let types = ['all', ...uniqueRoomTypes];

  // Func to map over types and render select options
  const renderRoomTypesOptions = ()=>{
    return types.map((type, i)=>(
      <option value={type} key={i}>{type}</option>
    ))
  }
  //get unique room capacities
  let uniqueCapacities = getUnique(props.rooms, 'capacity')
  //Func to render html options for room capacities
  const renderRoomCapacityOptions = ()=>{
    return uniqueCapacities.map((roomCapacity, i)=>(
      <option value={roomCapacity} key={i}>{roomCapacity}</option>
    ))
  }
  return (
    <section className="filter-container">
      <Title title="Search Rooms"/>
      <form className="filter-form">
        {/* select input "type" of rooms */}
        <div className="form-group">
          <label htmlFor="type">Room Type</label>
          <select 
            name="type" 
            id="type"
            value={context.type}
            onChange={context.handleChange}
          >
            {renderRoomTypesOptions()}
          </select>
        </div>
        {/* end select input "type" of rooms */}
        {/* select input "capacity" of rooms */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select 
            name="capacity" 
            id="capacity"
            value={context.capacity}
            onChange={context.handleChange}
          >
            {renderRoomCapacityOptions()}
          </select>
        </div>
        {/* end select input "type" of rooms */}
      </form>
    </section>
  );
};

export default RoomsFilter;