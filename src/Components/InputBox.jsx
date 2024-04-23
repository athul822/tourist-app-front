import React from 'react'

const Entry = ({data,setData,title,name,holde}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <p style={{ color: '#5e72e4' }}>{title}</p>
            <input style={{ background: '', color: '#5e72e4', padding: '.3em', fontSize: '.85em', minWidth: '200px' }} placeholder={`Enter ${holde ? holde : title}`} value={data[name]} type="text" name={name} id="" onChange={(e) => {
                setData(e.target.name,e.target.value )
            }} />
        </div>
    )
}

export default Entry