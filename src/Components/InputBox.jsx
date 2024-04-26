import React from 'react'
import styled from 'styled-components'

const Entry = ({data,setData,title,name,holde}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <p style={{ color: '#5e72e4' }}>{title}</p>
            <InputBox style={{ background: '', color: '#5e72e4', padding: '.3em', fontSize: '.85em', minWidth: '200px' }} placeholder={`Enter ${holde ? holde : title}`} value={data[name]} type="text" name={name} id="" onChange={(e) => {
                setData(e.target.name,e.target.value )
            }} />
        </div>
    )
}

export default Entry

const InputBox = styled.input`
    padding: 10px;
  font-size: .85em;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`