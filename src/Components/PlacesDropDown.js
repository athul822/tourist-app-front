import React from 'react';
import styled from 'styled-components';

function PlacesDropDown({ places, onChange, selectedPlaces }) {
  return (
    <SelectBox onChange={onChange} value={selectedPlaces}>
      <option value="">Select Place</option>
      {places.map(place => (
        <option key={place.id} value={place.id}>{place.name}</option>
      ))}
    </SelectBox>
  );
}

export default PlacesDropDown;
const SelectBox = styled.select`
  padding: 2px;
  font-size: .85em;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;