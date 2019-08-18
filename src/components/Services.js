import React, { Component } from 'react';
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaCoffee } from "react-icons/fa"

class Services extends Component {
  state={
    services: [
      {
        icon: <FaCocktail/>,
        title: 'Free drinks',
        info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, magni."
      },
      {
        icon: <FaHiking/>,
        title: 'Endless Hiking',
        info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, magni."
      },
      {
        icon: <FaShuttleVan/>,
        title: 'Free shuttle',
        info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, magni."
      },
      {
        icon: <FaCoffee/>,
        title: 'Strongest Coffee',
        info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, magni."
      },
    ]
  }

  renderServices = () =>(
    this.state.services.map((service, i)=>(
      <article key={i} className="service">
        <span>{service.icon}</span>
        <h6>{service.title}</h6>
        <p>{service.info}</p>
      </article>
    ))
  )
  
  render() {
    return (
      <section className="services">
        <Title title="services"/>
        <div className="services-center">
          {this.renderServices()}
        </div>
      </section>
    );
  }
}

export default Services;