import React, { Component } from 'react';
//local data for development
import items from "./data";

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
    loading: true
  }
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room=> room.featured === true);
    this.setState({
      rooms,
      sortedRooms: rooms,
      featuredRooms,
      loading: false
    })
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

  render() {
    return (
        <RoomContext.Provider value={{
          ...this.state,
          getRoom: this.getRoom
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