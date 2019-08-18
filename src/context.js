import React, { Component } from 'react';

//create context
const RoomContext = React.createContext();

//create context provider for that contxt
// <RoomContext.Provider value={"hej"}>

//create more advanced Provider to use state
class RoomProvider extends Component {
  state={
    name: 'Alex',
    age: 23
  }
  render() {
    return <RoomContext.Provider value={{...this.state}}>
      {this.props.children}
    </RoomContext.Provider>
  }
}
//create consumer for RoomContext
const RoomConsumer = RoomContext.Consumer;

export  {RoomProvider, RoomConsumer, RoomContext};

//TODO: wrap all app in index.js with RoomProvider