import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { withRoomConsumer } from '../context';
import Loading from './Loading';

//consuming context using HOCs
const RoomsContainer = (props) => {
  const { loading, sortedRooms, rooms } = props.context;
  if(loading){
    return <Loading/>
  }

  return (
    <>
      <RoomsFilter rooms={rooms}/>
      <RoomsList rooms={sortedRooms}/>
    </>
  )
};

export default withRoomConsumer(RoomsContainer);

// =====================
// consuming context using render props
// =====================

// import React from 'react';
// import RoomsFilter from './RoomsFilter';
// import RoomsList from './RoomsList';
// import { RoomConsumer } from '../context';
// import Loading from './Loading';

// //consuming context using render props
// const RoomsContainer = () => {
//   return (
//     <RoomConsumer>
//       {
//         value=>{
//           const { loading, sortedRooms, rooms } = value;
//           if(loading){
//             return <Loading/>
//           }
//           return (
//             <div>
//               Rooms Container
//               <RoomsFilter rooms={rooms}/>
//               <RoomsList sortedRooms={sortedRooms}/>
//             </div>
//           )
//         }
//       }
//     </RoomConsumer>
    
//   );
// };

// export default RoomsContainer;