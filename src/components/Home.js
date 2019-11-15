import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import slides from "../assets/slides";
import homeImages from "../assets/homeImages";

import "../styles/Home.css";

const Home = ({ Link, FontAwesome, arrowLeft, arrowRight }) => {
  const [currentSlide, setCurrentSlide] = useState(
    Math.floor(Math.random() * 4) + 1
  );

  const leftArrowClick = () => {
    if (currentSlide === 1) {
      setCurrentSlide(4);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const rightArrowClick = () => {
    if (currentSlide === 4) {
      setCurrentSlide(1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    if (currentSlide !== null) {
      const timeInterval = setInterval(() => {
        if (currentSlide === 4) {
          setCurrentSlide(1);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      }, 10000);
      return () => clearInterval(timeInterval);
    }
  }, [currentSlide]);

  const circleImageContainerClick = e => {
    const { id } = e.target;
    setCurrentSlide(parseInt(id.charAt(id.length - 1)));
  };

  return (
    <div className="home-main-container">
      <div className="images-container">
        <TransitionGroup>
          <CSSTransition
            key={currentSlide}
            timeout={1000}
            classNames="imageout"
          >
            <img
              className="home-slide-images"
              src={`${slides[currentSlide - 1].src}`}
              alt=""
            />
          </CSSTransition>
        </TransitionGroup>
        <div className="images-text-container">
          <FontAwesome
            className="arrows"
            icon={arrowLeft}
            onClick={leftArrowClick}
          />
          <TransitionGroup>
            <CSSTransition
              key={currentSlide}
              timeout={1000}
              classNames="image-text-out"
            >
              <p className="images-text">{slides[currentSlide - 1].text}</p>
            </CSSTransition>
          </TransitionGroup>
          <FontAwesome
            onClick={rightArrowClick}
            className="arrows"
            icon={arrowRight}
          />
        </div>

        <Link to="categories" className="store-button">
          Shop Now
        </Link>
        <div className="image-circles-container">
          <div
            onClick={circleImageContainerClick}
            id="image-circles-1"
            className={`image-circles ${
              currentSlide === 1 ? "image-circles-current" : ""
            }`}
          ></div>
          <div
            onClick={circleImageContainerClick}
            id="image-circles-2"
            className={`image-circles ${
              currentSlide === 2 ? "image-circles-current" : ""
            }`}
          ></div>
          <div
            onClick={circleImageContainerClick}
            id="image-circles-3"
            className={`image-circles ${
              currentSlide === 3 ? "image-circles-current" : ""
            }`}
          ></div>
          <div
            onClick={circleImageContainerClick}
            id="image-circles-4"
            className={`image-circles ${
              currentSlide === 4 ? "image-circles-current" : ""
            }`}
          ></div>
        </div>
      </div>

      <div className="home-images-container">
        {homeImages.map((item, i) => {
          return (
            <div
              key={`home-image-container-${i}`}
              className="home-image-container"
            >
              <img
                className="home-image"
                src={item}
                alt={"" /*`home-image-${i + 1}`*/}
              />
              <Link className="home-image-button" to="categories">
                Shop Now
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
