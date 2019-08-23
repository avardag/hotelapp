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
        {/* Room price */}
        <div className="form-group">
          <label htmlFor="price">Price {context.price}</label>
          <input 
            type="range"
            min={context.minPrice}
            max={context.maxPrice}
            name="price" 
            id="price"
            value={context.price}
            onChange={context.handleChange}
            className="form-control"
          />
        </div>
        {/* End Room price */}
        {/* Room size */}
        <div className="form-group">
          <label htmlFor="size">size {context.size}</label>
          <div className="size-inputs">
            <input 
              type="number"
              name="minSize" 
              id="size"
              value={context.minSize}
              onChange={context.handleChange}
              className="size-input"
            />
            <input 
              type="number"
              name="maxSize" 
              id="size"
              value={context.maxSize}
              onChange={context.handleChange}
              className="size-input"
            />

          </div>
        </div>
        {/* End Room size */}
        {/* extras checkboxes */}
        <div className="form-group">
          <div className="single-extra">
            <input 
              type="checkbox" 
              checked={context.breakfast}
              id="breakfast"
              name="breakfast"
              onChange={context.handleChange}
              />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input 
              type="checkbox" 
              checked={context.pets}
              id="pets"
              name="pets"
              onChange={context.handleChange}
              />
            <label htmlFor="pets">Pets</label>
          </div>
        </div>
        {/* End extras checkboxes */}
      </form>
    </section>
  );
};

export default RoomsFilter;