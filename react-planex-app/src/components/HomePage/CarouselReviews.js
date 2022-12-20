import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'

import './CarouselReviews.css';

export default class CaroselReviews extends Component {
  render() {
    return (
    <div className='car-r-bg' id='reviews'>
      <Carousel>
        <Carousel.Item  className='car-r-bg car-r-bg-img1'>
            <Carousel.Caption  className="carousel-caption d-flex flex-column justify-content-center h-100">
                <div className='rev-bl'>
                    <h3>“Planning events, tasks with a certain priority of execution, colorful categories are all things that help me plan my time. 
                      To be honest, Planex is what helped me improve my time management skills.”</h3>
                    <p>Maksym Burko</p>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='car-r-bg car-r-bg-img3'>
          <Carousel.Caption  className="carousel-caption d-flex flex-column justify-content-center h-100">
                <div className='rev-bl'>
                    <h3>“Planex is the best tool for saving my time. I adore calendar integration and ability to add event with categories.”</h3>
                    <p>Emma Young</p>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='car-r-bg car-r-bg-img2'>
          <Carousel.Caption  className="carousel-caption d-flex flex-column justify-content-center h-100">
                <div className='rev-bl'>
                    <h3>“This scheduling system has helped  me tremendously with scheduling appointments and reminders. 
                      When multitasking, the ability to color code appointments allows for easy and rapid scheduling.”</h3>
                    <p>Robert Fleming</p>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='car-r-bg car-r-bg-img4'>
          <Carousel.Caption  className="carousel-caption d-flex flex-column justify-content-center h-100">
                <div className='rev-bl'>
                    <h3>“This app has helped me stay on track with exams and assignments.”</h3>
                    <p>Marcus Hill</p>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
    )
  }
}
