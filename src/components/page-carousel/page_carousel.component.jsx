import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "./page_carousel.styles.css";

function createNestedArray(objectArray, pageSize) {
  let pagedArray = [];
  let objectsOnPage = [];
  if (objectArray && objectArray.length > 0) {
    let objectsCount = pageSize;
    for (let i=0; i<objectArray.length; i+=pageSize) {
      objectsOnPage = [];
      objectsCount = Math.min(i+pageSize, objectArray.length);
      for (let j=i; j<objectsCount; j++) {
        objectArray[j]['isDummy'] = false;
        objectsOnPage.push(objectArray[j]);
      }
      for (let j=objectsCount; j<i+pageSize; j++) {
        objectsOnPage.push({isDummy: true});
      }
      pagedArray.push(objectsOnPage);
    }
  } else {
    for (let i=0; i<pageSize; i++) {
      objectsOnPage.push({isDummy: true});
    }
    pagedArray.push(objectsOnPage);
  }
  return pagedArray;
}

function PageCarousel(props) {
  const [index, setIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [ObjectsByPage, setObjectsByPage] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const objectsArray = createNestedArray(props.data, pageSize);
    setObjectsByPage(objectsArray);
  }, [props.data])
 
  return (
    <Carousel
      indicators={false}
      variant={"dark"}
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
    >
      {ObjectsByPage.map((ObjectsPerPage, i) => {
        return (
          <Carousel.Item key={i}>
            <div className="carousel-images-container">
              {ObjectsPerPage.map((object) => {
                  {
                    return <div className="carousel-cover-image">
                      {(object.isDummy)? props.filler: object.html}
                    </div>
                  }
              })}
            </div>
          </Carousel.Item>
        );
      })} 
    </Carousel>
  );
}

export default PageCarousel;
