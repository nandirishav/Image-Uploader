import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";

import "./App.css";
import { generateDownload } from "./utils/cropImage";

const App = () => {
  const inputRef = useRef();
  // we need to trigger the popup from the choose button instead of the default choose file input
  const triggerFileSelectPopup = () => inputRef.current.click();
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // whenever we finish cropping image , it will set the final croppedImageSize to
  // croppedArea State variable
  {
    /* show the slider and cropper only when there is an image selected */
  }
  {
    /* for size of the cropper to be square the aspect needs to be equal to 1 */
  }
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      // use of this FileReader() is to read files asynchrounously
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    generateDownload(image, croppedArea);
  };

  return (
    <div className="container">
      <div className="container-cropper">
        {image ? (
          <>
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="slider">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          </>
        ) : null}
      </div>
      <div className="container-buttons">
        <input
          type="file"
          name=""
          id=""
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={onSelectFile}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={triggerFileSelectPopup}
          style={{ marginRight: "10px" }}
        >
          Choose{" "}
        </Button>
        <Button variant="contained" color="secondary" onClick={onDownload}>
          Download{" "}
        </Button>
      </div>
    </div>
  );
};

export default App;
