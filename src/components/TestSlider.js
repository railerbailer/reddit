import React, { Component } from 'react'
import Slider from 'react-slick'

export default class SlideChangeHooks extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: function (currentSlide, nextSlide) {
        console.log('before change', currentSlide, nextSlide);
      },
      afterChange: function (currentSlide) {
        console.log('after change', currentSlide);
      },
    };
    return (
      <div>
        <h2>beforeChange and afterChange hooks</h2>
        <Slider {...settings}>
          <div><h3>	f1</h3></div>
          <div><h3>s2</h3></div>
          <div><h3>d3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Slider>
      </div>
    );
  }
}