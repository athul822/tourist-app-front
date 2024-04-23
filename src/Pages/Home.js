import React, { useEffect, useState } from 'react'
import { get, post } from '../actions/api'
import styled from 'styled-components'
import DistrictDropdown from '../Components/DistictDopDown';
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

  useEffect(() => {
    post('/hotels/list', {
      "hotelType": "all"
    }).then(res => {
      console.log(res)
    })
  }, [])
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    // Do something with the selected district
  };

  return (
    <MainContainer>
     <div>
        <label htmlFor="district">Select a District:</label>
        {/* Use the DistrictDropdown component */}
        <DistrictDropdown
          districts={districts}
          onChange={handleDistrictChange}
          selectedDistrict={selectedDistrict}
        />
      </div>
    </MainContainer>
  )
}

export default Home

const MainContainer = styled.div`
  display: flex;
  background-color:#f5c0f599;
  flex-direction: column;
`;
