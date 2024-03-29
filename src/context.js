import React, { Component } from 'react';
//local data for development
// import items from "./data";

//contentFulConfigs
import client from './contentfulConfigs';

//create context
const RoomContext = React.createContext();

//create context provider for that contxt
// <RoomContext.Provider value={"hej"}>

//create more advanced Provider to use state
class RoomProvider extends Component {
  state={
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  }
  //fetches entries from DB
  getData = async ()=>{
    try {
      let response = await client.getEntries({
        'content_type': 'hotelApp',
        'order': 'sys.createdAt'
      })

      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room=> room.featured === true);
      //get maxPrize, maxSize of rooms fetched from server
      let maxPrice = Math.max(...rooms.map(room=> room.price));
      let maxSize = Math.max(...rooms.map(room=> room.size));
      //set State
      this.setState({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      })

    } catch (error) {
      console.log('error:', error)
    }
  }
  componentDidMount() {
    this.getData()
  }
  //format data got from server to readable object structure
  formatData = (itemsArray) =>{
    let tempItems = itemsArray.map((item)=>{
      let id = item.sys.id;
      let imagesUrls = item.fields.images.map(image=>{
        return image.fields.file.url
      })
      let room = {...item.fields, images: imagesUrls, id: id}
      return room
    })
    return tempItems;
  }
  
  //returns single room where slug matches
  getRoom = (slug)=>{
    let tempRooms  = this.state.rooms;
    const room = tempRooms.find(room=> room.slug === slug);
    return room;
  }
  //handle input change in filterRooms compnt
  handleChange = (e)=>{
    
    //check if input type is checkbox 
    const value = e.target.type ==="checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    }, this.filterRooms)
  }

  filterRooms = ()=>{
    let tempRooms = [...this.state.rooms];
    //apply filtering if type of rooms is anything but 'all'
    if(this.state.type !== 'all'){
      tempRooms = tempRooms.filter(room=> room.type === this.state.type)     
    }
    //filter by room capacity
    let capacity = parseInt(this.state.capacity);
    if(capacity !== 1){
      tempRooms = tempRooms.filter((room)=> room.capacity === capacity)
    }
    // filter by price
    let price = parseInt(this.state.price);
    tempRooms = tempRooms.filter(room=> room.price <= price)

    // filter by room size
    tempRooms = tempRooms.filter(room=>(
      room.size >=this.state.minSize && room.size <=this.state.maxSize
    ))
    //filter by breakfast
    if(this.state.breakfast){
      tempRooms = tempRooms.filter(room=> room.breakfast === true)
    }
    //filter by pets
    if(this.state.pets){
      tempRooms = tempRooms.filter(room=> room.pets === true)
    }
    //set state with sorted rooms filtered
    this.setState({sortedRooms: tempRooms})
  }
  render() {
    return (
        <RoomContext.Provider value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
          }}
        >
          {this.props.children}
        </RoomContext.Provider>
    )
  }
}
//create consumer for RoomContext
const RoomConsumer = RoomContext.Consumer;

//HOC for consuming context in functional components
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props){
    return <RoomConsumer>
      {value=> < Component {...props} context={value} />}
    </RoomConsumer>
  }
}

export  {RoomProvider, RoomConsumer, RoomContext};

//TODO: wrap all app in index.js with RoomProvider