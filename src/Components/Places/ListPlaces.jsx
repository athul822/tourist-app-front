import React, { useEffect, useState } from 'react';
import { post } from '../../actions/api'; // Assuming this is a function to post data to an API
import styled from 'styled-components';
import delete_icon from '../../assets/delete_icon.png'; // Icon for delete button
import CircularLoading from '../CircularLoading';

const ListPlaces = ({ apiUrl, flag }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const getList = () => {
    setIsLoading(true); // Set loading to true
    post(`/${apiUrl}/list`, { id: "all" })
      .then((res) => {
        setList(res.data); // Update list with fetched data
      })
      .catch((err) => {
        console.error(err); // Handle error
      })
      .finally(() => {
        setIsLoading(false); // Reset loading
      });
  };

  useEffect(() => {
    getList();
  }, [flag]); // Fetch when flag changes

  useEffect(() => {
    getList(); // Fetch on component mount
  }, []);

  const handleDelete = (id) => {
    setIsLoading(true); // Set loading when deleting
    post(`/${apiUrl}/delete`, { id })
      .then((res) => {
        console.log(res);
        getList(); // Refresh list after deletion
      })
      .catch((err) => {
        console.error(err); // Handle error
      })
      .finally(() => {
        setIsLoading(false); // Reset loading
      });
  };

  return (
    <div>
     

      <MainContainer>
      {isLoading && <CircularLoading />} {/* Show loading spinner */}
        {list.map((item) => (
          <CadContainer key={item.id}>
            <InsideContainer1>
              <ImageView src={item.image} alt={item.name} /> {/* Place image */}
            </InsideContainer1>
            <InsideContainer2>
              <InsideContainer3>
                <p style={{ color: '#5e72e4', paddingTop: ".2em" }}>{item.name}</p>
                <Description>
                  <p style={{ fontSize: "12px" }}>{item.description}</p> {/* Place description */}
                </Description>
                <p>Price: {item.price}</p> {/* Place price */}
              </InsideContainer3>
              <InsideContainer4 onClick={() => handleDelete(item.id)}>
                <ImageView2 src={delete_icon} alt="Delete" /> {/* Delete button */}
              </InsideContainer4>
            </InsideContainer2>
          </CadContainer>
        ))}
      </MainContainer>
    </div>
  );
};

export default ListPlaces;

// Styled-components for layout and styling
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  position: relative;
`;

const Description = styled.div`
  width: 200px;
  height: 43px; // Ensures only certain amount of text is visible
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; // Limit to three lines
`;

const CadContainer = styled.div`
  display: flex;
  gap: 0.8em;
  box-shadow: 0 0 5px #5e72e4;
  border-radius: 10px;
`;

const InsideContainer1 = styled.div`
  width: 180px;
`;

const InsideContainer2 = styled.div`
  flex: 1;
  display: flex;
  gap: 0.8em;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const InsideContainer3 = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
`;

const InsideContainer4 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: red;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 120px;
  justify-content: center;
  align-items: center;
`;

const ImageView = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const ImageView2 = styled.img`
  width: 60%;
  height: 60%;
  object-fit: cover;
`;
