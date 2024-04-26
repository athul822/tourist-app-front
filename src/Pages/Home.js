import React, { useEffect, useState } from 'react'
import { get, post } from '../actions/api'
import styled from 'styled-components'
import DistrictDropdown from '../Components/DistictDopDown';
import HomeCads from '../Components/HomeCads';
const disticts = [
  { "name": "Thiruvananthapuram", "id": 0 },
  { "name": "Kollam", "id": 1 },
  { "name": "Pathanamthitta", "id": 2 },
  { "name": "Alappuzha", "id": 3 },
  { "name": "Kottayam", "id": 4 },
  { "name": "Idukki", "id": 5 },
  { "name": "Ernakulam", "id": 6 },
  { "name": "Thrissur", "id": 7 },
  { "name": "Palakkad", "id": 8 },
  { "name": "Malappuram", "id": 9 },
  { "name": "Kozhikode", "id": 10 },
  { "name": "Wayanad", "id": 11 },
  { "name": "Kannur", "id": 12 },
  { "name": "Kasaragod", "id": 13 }
]
function Home() {
  const [districts, setDistricts] = useState(disticts);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    // Do something with the selected district
  };

  return (
    <MainContainer>
      <h2 style={{ marginTop:0 }}>Recent Places</h2>
      <HomeCads url={'places'}/>
      <h2>Recent Hotels</h2>
      <HomeCads url={'hotels'}/>
    </MainContainer>
  )
}

export default Home

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


