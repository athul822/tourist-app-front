import React from 'react';
import { Outlet,useNavigate } from 'react-router';
import styled from 'styled-components';
import SidebarItem from '../Components/SideBar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faHome,faMapMarkerAlt,faHotel} from '@fortawesome/free-solid-svg-icons';
import { main, secondary } from '../utils/theme';
function Layout() {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(0);
  const menu = [
    { id: 0, name: 'Home', link: '',icon: faHome },
    { id: 1, name: 'Tourist Atractions', link: 'tourist-atractions' ,icon: faMapMarkerAlt},
    { id: 2, name: 'Hotels', link: 'hotels',icon: faHotel },
  ]

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }
  return (
    <MainContainer>
      <SideBar>
        <SideBarTop>
          <h2>Tourist app</h2>
        </SideBarTop>
        <SideBarBottom>
          {
            menu.map((item, index) => <SidebarItem item={item} key={index} id={index} setSelectedMenu={() => setSelected(index)} selected={selected} />)
          }

        </SideBarBottom>
      </SideBar>
      <MainContentContainer>
        <TitleBar>
          <h2>{menu[selected].name}</h2>
          <LogoutButton
          onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </LogoutButton>
        </TitleBar>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </MainContentContainer>
    </MainContainer>
  );
}

export default Layout;

const MainContainer = styled.div`
  /* Updated flex property */
  display: flex;
  height: 100vh;
  background-color: ${main};
 
`;

const LogoutButton = styled.button`
  padding: .5em;
  border-radius: 10px;
  border: none;
  background-color: ${secondary};
  color: white;
  cursor: pointer;
`;

const SideBar = styled.div`
  flex: 2;
  height: 100vh;
//   background-color: white;
 
  display: flex;
  flex-direction: column;
`;

const MainContentContainer = styled.div`
  flex: 10;
//   background-color: yellow;
 
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TitleBar = styled.div`
  flex: 1;
//   background-color: blue;
  color: ${secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  border-radius: 10px;
  padding-right: 10px;
`;

const OutletContainer = styled.div`
  flex: 18;
//   background-color: green;

  /* Removed height property */
  overflow-y: auto; /* Added to enable scrolling if needed */
  // box-shadow: 0 0 5px ${secondary};
  // margin: 10px;
  border-radius: 10px;
  padding: 10px;
`;

const SideBarTop = styled.div`
  flex: 1;
//   background-color: blue;
   color: ${secondary};
   display: flex;
   align-items: center;
   justify-content: center;
`;

const SideBarBottom = styled.div`
  flex: 18;
//   background-color: green;
  
  /* Removed height property */
  overflow-y: auto; /* Added to enable scrolling if needed */
`;
