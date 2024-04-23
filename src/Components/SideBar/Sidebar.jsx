import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components'

const SidebarItem = ({item, selected, id, setSelectedMenu }) => {
    const nav = useNavigate()
    const selectedStyle = `
    padding: 10px;
    background-color:#5e72e4;
    color: white;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 0 5px #5e72e4;
    padding-left: 14px;
    `;
    const nomalStyle = `
    padding: 10px;
    color: #5e72e4;
    margin: 10px;
    border-radius: 10px;
   
    `
    const SideBarButton = styled.div`
   ${selected == id ? selectedStyle : nomalStyle}
`
    return (
        <SideBarButton onClick={()=>{
            setSelectedMenu()
            nav(item.link)
            }}>
            {item.name}
        </SideBarButton>
    )
}

export default SidebarItem

