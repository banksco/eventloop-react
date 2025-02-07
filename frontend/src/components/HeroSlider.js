import React from 'react'
import Carousel from 'react-bootstrap/Carousel';


const HeroSlider = () => {
  return (
    <>
    <Carousel>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="/images/sliderImages-01.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="/images/sliderImages-02.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="/images/sliderImages-03.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>


    </>
  )
}

export default HeroSlider