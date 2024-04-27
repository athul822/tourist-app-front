import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { secondary } from '../../utils/theme';

const SidebarItem = ({item, selected, id, setSelectedMenu }) => {
    const nav = useNavigate()
    const selectedStyle = `
    padding: 10px;
    background-color:${secondary};
    color: white;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 0 5px ${secondary};
    padding-left: 14px;
    cursor: pointer;
   
    `;
    const nomalStyle = `
    padding: 10px;
    color: ${secondary};
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

