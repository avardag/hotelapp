import React, { Component } from 'react';
import defaultBcg from "../images/defaultBcg.jpeg";
import Banner from '../components/Banner';
import { Link } from "react-router-dom";
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';

class SingleRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      slug: this.props.match.params.slug,
      room: {},
      defaultBcg
    }
  }

  static contextType = RoomContext;

  // componentDidMount() {  }
  
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    //if room is not found or undefined
    if(!room){
      return (
        <div className="error">
          <h3>No room found ...</h3>
          <Link to="/rooms" className="btn-primary">
            Back to rooms
          </Link>
        </div>
      );
    }

    const { name, description, capacity, size, price, extras, pets, images, breakfast } = room;
    //destructure images array to get main img and rest of images
    const [mainImg, ...defaultImages] = images;
    return ( 
      <>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              Back to Rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImages.map((image, i)=>(
              <img key={i} src={image} alt={name}/>
            ))}
          </div>

          <div className="single-room-info">
            <article className="desc">
              <h3>Details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>Info</h3>
              <h6>Price: ${price}</h6>
              <h6>Size: {size} SQFT</h6>
              <h6>
                Max Capacity: {
                  capacity>1 ? `${capacity} people` : `${capacity} people`
                }
              </h6>
              <h6>{pets? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>

        </section>
        <section className="room-extras">
          <h6>Extras</h6>
          <ul className="extras">
            {extras.map((item, i)=>(
              <li key={i}>- {item}</li>
            ))}
          </ul>
        </section>
      </>
    );
  }
}

export default SingleRoom;