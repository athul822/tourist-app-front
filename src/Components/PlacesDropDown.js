import React from 'react';

function PlacesDropDown({ places, onChange, selectedPlaces }) {
  return (
    <select onChange={onChange} value={selectedPlaces} style={{padding:'5px'}}>
      <option value="">Select Place</option>
      {places.map(place => (
        <option key={place.id} value={place.id}>{place.name}</option>
      ))}
    </select>
  );
}

export default PlacesDropDown;
