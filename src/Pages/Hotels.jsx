import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Entry from '../Components/InputBox';
import ListPlaces from '../Components/Places/ListPlaces';
import ImagePicker from '../Components/ImagePicker';
import { post } from '../actions/api';
import PlacesDropDown from '../Components/PlacesDropDown';
import DistrictDropdown from '../Components/DistictDopDown';
import ListHotels from '../Components/Places/ListHotels';
import { secondary } from '../utils/theme';

// Sample list of districts
const districts = [
  { name: 'Thiruvananthapuram', id: 0 },
  { name: 'Kollam', id: 1 },
  { name: 'Pathanamthitta', id: 2 },
  { name: 'Alappuzha', id: 3 },
  { name: 'Kottayam', id: 4 },
  { name: 'Idukki', id: 5 },
  { name: 'Ernakulam', id: 6 },
  { name: 'Thrissur', id: 7 },
  { name: 'Palakkad', id: 8 },
  { name: 'Malappuram', id: 9 },
  { name: 'Kozhikode', id: 10 },
  { name: 'Wayanad', id: 11 },
  { name: 'Kannur', id: 12 },
  { name: 'Kasaragod', id: 13 },
];

// Improved validation function
const validateForm = (data, selectedDistrict, selectedPlace, base64Image) => {
  const requiredFields = [
    { field: data.name, fieldName: 'Hotel Name' },
    { field: data.description, fieldName: 'Description' },
    { field: data.address, fieldName: 'Address' },
    { field: data.contactNumber, fieldName: 'Contact Number' },
    { field: data.price, fieldName: 'Price' },
    { field: data.totalRooms, fieldName: 'Total Rooms' },
  ];

  // Check if required fields are empty or undefined
  for (const required of requiredFields) {
    if (!required.field || required.field.trim() === '') {
      return `Field "${required.fieldName}" is required.`;
    }
  }

  // Additional checks for district, place, and image
  if (!selectedDistrict) {
    return 'Please select a district.';
  }

  if (!selectedPlace) {
    return 'Please select a place.';
  }

  if (!base64Image) {
    return 'Please provide a valid image.';
  }

  // Specific validations for contact number and price
  if (isNaN(data.contactNumber) || data.contactNumber.trim().length < 10) {
    return 'Contact Number must be a valid number with at least 10 digits.';
  }

  if (isNaN(data.price) || data.price < 0) {
    return 'Price must be a valid non-negative number.';
  }

  // If no validation errors, return null
  return null;
};

const TouristAttractions = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [data, setData] = useState({});
  const [base64Image, setBase64Image] = useState(null);
  const [error, setError] = useState(null); // Error state for form validation issues
  const [flag, setFlag] = useState(false);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const reset = () => {
    setData({});
    setBase64Image(null);
    setSelectedDistrict(null);
    setError(null); // Reset error on form reset
  };

  useEffect(() => {
    if (selectedDistrict) {
      post('places/getPlaceByDistrict', {
        districtId: selectedDistrict,
      })
        .then((res) => {
          setPlaces(res.data);
        })
        .catch((error) => {
          console.error('Error fetching places:', error);
        });
    }
  }, [selectedDistrict]);

  const handleSubmit = () => {
    const validationError = validateForm(data, selectedDistrict, selectedPlace, base64Image);

    if (validationError) {
      setError(validationError);
      return; // Don't proceed with form submission
    }

    const submitData = {
      ...data,
      districtId: selectedDistrict,
      placeId: selectedPlace,
      image: base64Image,
    };
    submitData.availableRooms = submitData.totalRooms
    setIsLoading(true);
    post('/hotels/register', submitData)
      .then((res) => {
        console.log(res);
        setFlag(!flag);
        reset(); // Reset form after successful submission
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error submitting form:', err);
        setError('An error occurred during form submission. Please try again later.');
        setIsLoading(false);
      });
  };

  return (
    <MainContainer>
      <FormContainer>
        <FormContainerInner>
          {error && (
            <ErrorContainer>
              <p>{error}</p>
            </ErrorContainer>
          )}
          <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
              <p style={{ color: secondary }}>District*</p>
              <DistrictDropdown
                districts={districts}
                onChange={handleDistrictChange}
                selectedDistrict={selectedDistrict}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
              <p style={{ color: secondary }}>Place*</p>
              <PlacesDropDown
                places={places}
                onChange={(e) => setSelectedPlace(e.target.value)}
                selectedPlace={selectedPlace}
              />
            </div>
          </div>
          <Entry
            data={data}
            title="Hotel Name*"
            name="name"
            setData={(name, value) => setData({ ...data, [name]: value })}
          />
          <Entry
            data={data}
            title="Description*"
            name="description"
            setData={(name, value) => setData({ ...data, [name]: value })}
          />
          <Entry
            data={data}
            title="Address*"
            name="address"
            setData={(name, value) => setData({ ...data, [name]: value })}
          />
          <Entry
            data={data}
            title="Contact Number*"
            name="contactNumber"
            setData={(name, value) => setData({ ...data, [name]: value })}
          />
          <Entry
            data={data}
            title="Price*"
            name="price"
            setData={(name, value) => setData({ ...data, [name]: value })}
          />
       
       <Entry
            data={data}
            title="Total No of Rooms*"
            name="totalRooms"
            setData={(name, value) => setData({ ...data, [name]: value })}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.4em' }}>
            <p style={{ color: secondary, marginBottom: '1em' }}>Pick Place Image*</p>
            <ImagePicker
              base64Image={base64Image}
              setBase64Image={(base64String) => setBase64Image(base64String)}
            />
          </div>
          <div style={{ width: '100%', marginTop: '1em' }}>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </div>
        </FormContainerInner>
      </FormContainer>
      <ListContainer>
        <ListHotels api={'hotels'} flag={flag} />
      </ListContainer>
    </MainContainer>
  );
};

export default TouristAttractions;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  gap: .8em;
`;

const FormContainer = styled.div`
  flex: 1;
  background-color: white;
  box-shadow: 0 0 5px ${secondary};
  padding: 1em;
  border-radius: 10px;
  overflow-y: scroll;
`;

const FormContainerInner = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

const ListContainer = styled.div`
  flex: 1;
  background-color: white;
  box-shadow: 0 0 5px ${secondary};
  padding: 1em;
  border-radius: 10px;
  overflow-y: auto;
`;

const SubmitButton = styled.button`
  width: 200px;
  padding: 0.5em;
  border: none;
  background-color: ${secondary};
  color: white;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
`;

const ErrorContainer = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
`;
