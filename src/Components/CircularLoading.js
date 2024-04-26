import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for spinning effect
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Full-screen overlay with transparency
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); // Semi-transparent black
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Make sure it's above other content
`;

// Circular spinner with animated spin
const Spinner = styled.div`
  border: 8px solid #f3f3f3; // Light gray outer border
  border-top: 8px solid #3498db; // Blue for spinning effect
  border-radius: 50%; // Circular shape
  width: 60px; // Spinner size
  height: 60px;
  animation: ${spin} 1s linear infinite; // Spin animation
`;

const CircularLoading = () => (
  <LoadingOverlay>
    <Spinner />
  </LoadingOverlay>
);

export default CircularLoading;
