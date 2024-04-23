import React from 'react';

function DistrictDropdown({ districts, onChange, selectedDistrict }) {
  return (
    <select onChange={onChange} value={selectedDistrict} style={{padding:'5px'}}>
      <option value="">Select District</option>
      {districts.map(district => (
        <option key={district.id} value={district.id}>{district.name}</option>
      ))}
    </select>
  );
}

export default DistrictDropdown;
