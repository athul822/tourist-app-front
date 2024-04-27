import React from 'react';
import styled from 'styled-components';
import { secondary } from '../utils/theme';

// Custom button to replace the default file input
const FileButton = styled.label`
  background-color: ${secondary}; // Custom button background color
  color: white; // Button text color
  padding: 4px 6px; // Padding for the button
  cursor: pointer; // Change cursor to pointer on hover
  border-radius: 5px; // Rounded corners
  border: 1px solid transparent; // Optional border
  margin-bottom: 1em;
`;

// Styled input element (hidden)
const StyledInputBox = styled.input`
  display: none; // Hide the default input box
`;

const ImagePicker = ({ base64Image, setBase64Image }) => {
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

    // Re-encode the image with the given quality (JPEG supports quality parameter)
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
          // Compress the image with a quality factor of 0.3 (30%)
          const compressedBase64 = compressImage(img, 0.3);
          setBase64Image(compressedBase64);
        };
      };

      reader.readAsDataURL(file); // Reads the file as base64
    }
  };

  return (
    <div>
      {/* Custom button and hidden input for file selection */}
      <FileButton htmlFor="file-input">Choose File</FileButton>
      <StyledInputBox
        id="file-input"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      
      {/* Display the selected and compressed image */}
      {base64Image && (
        <div>
          <img src={base64Image} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
