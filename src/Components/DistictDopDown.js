import React from 'react';
import styled from 'styled-components';

function DistrictDropdown({ districts, onChange, selectedDistrict }) {
  return (
    <SelectBox onChange={onChange} value={selectedDistrict}>
      <option value="">Select District</option>
      {districts.map(district => (
        <option key={district.id} value={district.id}>{district.name}</option>
      ))}
    </SelectBox>
  );
}

export default DistrictDropdown;

const SelectBox = styled.select`
  padding: 2px;
  font-size: .85em;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;
