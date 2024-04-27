import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    cursor: pointer;
   
    `;
    const nomalStyle = `
    padding: 10px;
    color: #5e72e4;
    margin: 10px;
    border-radius: 10px;
    cursor: pointer;
   
   
    `
    const SideBarButton = styled.div`
   ${selected == id ? selectedStyle : nomalStyle}

`
    return (
       
        <SideBarButton onClick={()=>{
            setSelectedMenu()
            nav(item.link)
            }}>
             <FontAwesomeIcon icon={item.icon} />{'  '}
            {item.name}
        </SideBarButton>
     
    )
}

export default SidebarItem

