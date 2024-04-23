import React, { useState } from 'react';

const ImagePicker = ({base64Image,setBase64Image}) => {
//   const [base64Image, setBase64Image] = useState(null);
const compressImage = (image, quality) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;

    // Set the canvas size to the original image size
    canvas.width = width;
    canvas.height = height;

    // Draw the original image onto the canvas
    ctx.drawImage(image, 0, 0, width, height);

    // Re-encode the image with a lower quality (JPEG supports quality parameter)
    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

    return compressedBase64;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = async () => {
          // Compress the image with a quality factor of 0.5 (50%)
          const compressedBase64 = compressImage(img, 0.3);
          setBase64Image(compressedBase64);
        }
    }
      reader.readAsDataURL(file); // Reads the file as base64
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {base64Image && (
        <div>
          <img src={base64Image} alt="Selected" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
