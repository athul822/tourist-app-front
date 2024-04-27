import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { get } from '../actions/api';
import CircularLoading from './CircularLoading';
import { secondary } from '../utils/theme';

const HomeCads = ({ url }) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    get(`/${url}/recent`).then(res => {
      setRecent(res.data)
      console.log(res.data, "hotels")
      setIsLoading(false);
    })
  }, [])

  const [recent, setRecent] = useState([]);

  return (
    <RecentContainer>
      {isLoading && <CircularLoading />}
      {
        recent.map((item, index) =>
          <RecentCard key={index} bg={item.image}>
            <p style={{ color: 'white',position: 'absolute',zIndex: '2',backgroundColor:'none' }}>{item.name}</p>
            <Overlay />
            
          </RecentCard>)
      }
    </RecentContainer>
  )
}

export default HomeCads

const RecentContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 94%;
  overflow-y: scroll;
  background-color: ${secondary};
  padding: .5em;
  border-radius: 10px;
  box-shadow: 0 0 5px ${secondary};

`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1); /* Adjust the alpha value for desired transparency */
  z-index: 1; /* Ensure the overlay is above the card */
  border-radius: 10px; /* Same border-radius as the card for consistency */
  `
const RecentCard = styled.div`
  background-color: white;
  box-shadow: 0 0 5px ${secondary};
  padding: 1em;
  border-radius: 10px;
  width: 180px;
  height: 100px;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative; /* This is important to keep the pseudo-element within the card */

  /* Add the black overlay using ::before */
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha value for desired transparency */
    border-radius: 10px; /* Same border-radius as the card for consistency */
  }

  /* Content styling for text or other elements */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* Text should be white or another light color to be visible against the dark overlay */
  font-weight: bold;
`;