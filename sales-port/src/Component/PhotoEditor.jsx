import React, { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import { Postdata, Postdataform } from '../API/GlobalApi';

export const PhotoEditor = ({
  capturedPhoto,
  setCapturedPhoto,
  setShowEditor,
  setshowvaliditymodal,
  setpaymentmodal,
  imgurl,
  setimgurl,
  setFingerprints,
  setidcardmodal,
  selectedOrgDetails,
  fingerprints
}) => {
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const fetchImageAsBlobURL = async (url) => {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };




  const getCroppedImageCanvas = async (imageSrc, crop, rotation = 0, flip = false) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
    console.log("imageSrc---",imageSrc)

    await new Promise((res) => (image.onload = res));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    if (flip) ctx.scale(-1, 1);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
    ctx.restore();

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to generate Blob"));
      }, 'image/jpeg');
    });
  };

  const finalizeCrop = async () => {
    try {
      const imageBlob = await getCroppedImageCanvas(capturedPhoto, croppedAreaPixels, rotation, flip);
      console.log('imageBlob---',imageBlob)

      const formData = new FormData();
      formData.append('file', imageBlob, 'cropped-photo.jpg');

      const response = await Postdataform("staff/upload-file/",formData)
      // const response = await fetch('https://bgi.sortstring.com/api/v1/staff/upload-file/', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Token ${localStorage.getItem("token")}`,
      //   },
      //   body: formData
      // });

      // const result = await response.json();
      console.log("✅ Upload success", response);
      setimgurl(response?.file_url);
      handleSubmit(response?.file_url);

    } catch (err) {
      console.error("❌ finalizeCrop error:", err);
    }
  };

  const handleSubmit = async (img) => {
    const finalobj = {
      student: selectedOrgDetails?.user_id,
      finger_iso_1: fingerprints[0]?.IsoTemplate || "",
      finger_iso_2: fingerprints[1]?.IsoTemplate || "",
      finger_iso_3: fingerprints[2]?.IsoTemplate || "",
      id_card_photo: img,
      valid_from_date: "2024-12-06",
      valid_to_date: "2024-12-06"
    };

    const url = `students/students-attendance/`;
    const res = await Postdata(url, finalobj);
    if (!res.error) {
      setShowEditor(false);
      setshowvaliditymodal(true);
      setpaymentmodal(true);
    }
  };
 useEffect(() => {
  const convertImageToBase64 = async () => {
    try {
      if (selectedOrgDetails?.profile_picture && !capturedPhoto) {
        const response = await fetch(selectedOrgDetails.profile_picture, { mode: 'cors' });
        const blob = await response.blob();
        const reader   = new FileReader();

        reader.onloadend = () => {
          setCapturedPhoto(reader.result);  // ✅ Base64 image passed to Cropper
        };
        reader.readAsDataURL(blob);
      }
    } catch (error) {
      console.error("Failed to fetch and convert image:", error);
    }
  };

  convertImageToBase64();
}, [selectedOrgDetails]);
  return (
    <div className="camera-modal" style={{ backgroundColor: '#fff', zIndex: 9999, padding: 20, width: '540px' }}>
      {!capturedPhoto ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>No image available</div>
      ) : (
        <div style={{ position: 'relative', height: 200, width: 500 }}>
          <Cropper
            image={capturedPhoto}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={3 / 4}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                transform: flip ? 'scaleX(-1)' : 'scaleX(1)',
              },
            }}
          />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, margin: '10px 0' }}>
        <button onClick={() => setRotation((prev) => prev + 90)}>⟳ Rotate</button>
        <button onClick={() => setFlip((prev) => !prev)}>⇋ Flip</button>
        <button onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}>＋ Zoom In</button>
        <button onClick={() => setZoom((prev) => Math.max(prev - 0.2, 1))}>－ Zoom Out</button>
      </div>

      <div style={{ marginBottom: 10 }}>
        Brightness
        <Slider value={brightness} min={50} max={150} onChange={(e, val) => setBrightness(val)} />
        Contrast
        <Slider value={contrast} min={50} max={150} onChange={(e, val) => setContrast(val)} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
        <button onClick={() => {
          setShowEditor(false);
          setCapturedPhoto();
          setFingerprints([null, null, null]);
        }}>Cancel</button>
        <button className="add-btn" onClick={finalizeCrop}>Done</button>
      </div>
    </div>
  );
};
