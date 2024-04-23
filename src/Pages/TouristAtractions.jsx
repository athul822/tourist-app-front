import React, { useState } from 'react'
import styled from 'styled-components';
import Entry from '../Components/InputBox';
import DistrictDropdown from '../Components/DistictDopDown';
import ListPlaces from '../Components/Places/ListPlaces';
import ImagePicker from '../Components/ImagePicker';
import { post } from '../actions/api';

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

const TouristAtractions = () => {
  const [districts, setDistricts] = useState(disticts);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [data, setData] = useState({})
  const [base64Image, setBase64Image] = useState(null);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    // Do something with the selected district
  };

  const reset = () => {
    setData({});
    setBase64Image(null);
    setSelectedDistrict(null);
  }

  const handleSubmit = () => {
    data.districtId = selectedDistrict;
    data.image = base64Image
    console.log("data", data);
    post('/places/register', data).then(res => {
      console.log(res);
      reset()
      // alert("Place added successfully")
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <MainContainer>
      <FormContainer>
        <FormContainerInner>
          <Entry data={data} title="Place Name*" name='name' setData={(name, value) => {
            setData({
              ...data, [name]: value
            })
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <p style={{ color: '#5e72e4' }}>District</p>
            <DistrictDropdown
              districts={districts}
              onChange={handleDistrictChange}
              selectedDistrict={selectedDistrict}
            />
          </div>
          <Entry data={data} title="Description*" name='description' setData={(name, value) => {
            setData({
              ...data, [name]: value
            })
          }} />
          <Entry data={data} title="Address*" name='address' setData={(name, value) => {
            setData({
              ...data, [name]: value
            })
          }} />
          <Entry data={data} title="Lattitude*" name='lat' setData={(name, value) => {
            setData({
              ...data, [name]: value
            })
          }} />
          <Entry data={data} title="Longitude*" name='lon' setData={(name, value) => {
            setData({
              ...data, [name]: value
            })
          }} />
          <Entry data={data} title="Nearest Bus Stop*" name='nearByBusStops' setData={(name, value) => {
            setData({
              ...data, [name]: value
            })
          }} />
          <Entry data={data} title="Nearest Railway Station*" name='nearByRailStops' setData={(name, value) => {
            setData({
              ...data, [name]: value
            })
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.4em' }}>
            <p style={{ color: '#5e72e4' }}>Pick Place Image</p>
            <ImagePicker base64Image={base64Image} setBase64Image={(base64String) => {
              setBase64Image(base64String);
            }} />
             <Entry data={data} title="Price*" name='price' setData={(name, value) => {
            setData({
              ...data, [name]: value
            })
          }} />
          </div>
          <div style={{ width: '100%', marginTop: '1em' }}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </FormContainerInner>
      </FormContainer>
      <ListContainer>
        <ListPlaces apiUrl={'places'} />
      </ListContainer>
    </MainContainer>
  )
}

export default TouristAtractions

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  gap: .8em;
`;
const FormContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 1em;
 flex:1;
 height: 92%;
 background-color: white;
 box-shadow: 0 0 5px #5e72e4;
padding: 1em;
border-radius: 10px;
overflow-y: scroll;
margin-bottom: 1em;
`;
const FormContainerInner = styled.div`
display: flex;
flex-wrap: wrap;
gap: 1em;
 flex:1;
 height: 100%;
 align-content: flex-start;
`;
const ListContainer = styled.div`
flex:1;
height: 92%;
box-shadow: 0 0 5px #5e72e4;
padding: 1em;
border-radius: 10px;
overflow-y: scroll;
 background-color: white;
`;