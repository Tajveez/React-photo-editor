import React, { useState, useRef } from "react";
import "./App.css";
import Slider from "./components/Slider";
import SidebarItem from "./components/SidebarItem";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState(
    "https://source.unsplash.com/EwKXn5CapA4"
  );
  const imageFileEl = useRef();
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];

  function handleOptionsChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return {
          ...option,
          value: target.value,
        };
      });
    });
  }

  function getImageStyles() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" ") };
  }

  function downloadImage() {
    const image = document.querySelector("body .main-image");
    console.log(image);
    // document.querySelector('.main-image').style.backgroundImage = 'url("https://source.unsplash.com/EwKXn5CapA4")';
  }

  function uploadImage() {
    document.querySelector(".image-file").click();
    return;
  }
  function setNewImage() {
    console.log(imageFileEl.current.files[0]);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      setOptions(DEFAULT_OPTIONS);
      document.querySelector(
        ".main-image"
      ).style.backgroundImage = `url(${e.target.result})`;
    };

    if (imageFileEl.current.files[0] !== "undefined") {
      fileReader.readAsDataURL(imageFileEl.current.files[0]);
    }
  }
  return (
    <>
      <div className="container">
        <div className="sidebar">
          {options.map((option, index) => {
            return (
              <SidebarItem
                key={index}
                name={option.name}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
              />
            );
          })}
          <input
            type="file"
            className="image-file"
            onChange={setNewImage}
            ref={imageFileEl}
            accept="image/*"
            style={{ display: "none" }}
          />
          <a onClick={uploadImage} className="download-image">
            Upload Image
          </a>
          {/* <a onClick={downloadImage} className="download-image">
            Download
          </a> */}
        </div>
        <div className="main-image" style={getImageStyles()}></div>
        <Slider option={selectedOption} changeValue={handleOptionsChange} />
      </div>
    </>
  );
}

export default App;
