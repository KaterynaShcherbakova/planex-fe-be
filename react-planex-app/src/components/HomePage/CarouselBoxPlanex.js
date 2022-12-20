import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import img1 from "./img/planex-1.png"
import img2 from "./img/planex-2.png"
import img3 from "./img/planex-3.png"
import img4 from "./img/planex-4.png"
import img5 from "./img/planex-5.png"



export default class CarouselBoxPlanex extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item className="pl-img-carosel">
            <img className="d-block w-100 pl-img-carosel" src={img1} alt="planex"/>
        </Carousel.Item>
        <Carousel.Item className="pl-img-carosel">
            <img className="d-block w-100 pl-img-carosel" src={img2} alt="planex"/>
        </Carousel.Item>
        <Carousel.Item className="pl-img-carosel">
            <img className="d-block w-100 pl-img-carosel" src={img3} alt="planex"/>
        </Carousel.Item>
        <Carousel.Item className="pl-img-carosel">
            <img className="d-block w-100 pl-img-carosel" src={img4} alt="planex"/>
        </Carousel.Item>
        <Carousel.Item className="pl-img-carosel">
            <img  className="d-block w-100" src={img5} alt="planex"/>
        </Carousel.Item>
      </Carousel>
    )
  }
}
