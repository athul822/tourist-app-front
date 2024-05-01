import React, { useEffect, useState } from 'react';
import { post } from '../../actions/api'; // Assuming this is a function to post data to an API
import styled from 'styled-components';
import delete_icon from '../../assets/delete_icon.png'; // Icon for delete button
import CircularLoading from '../CircularLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { secondary } from '../../utils/theme';
import DistrictDropdown from '../DistictDopDown';
const districts = [
  { name: 'Thiruvananthapuram', id: 0 },
  { name: 'Kollam', id: 1 },
  { name: 'Pathanamthitta', id: 2 },
  { name: 'Alappuzha', id: 3 },
  { name: 'Kottayam', id: 4 },
  { name: 'Idukki', id: 5 },
  { name: 'Ernakulam', id: 6 },
  { name: 'Thrissur', id: 7 },
  { name: 'Palakkad', id: 8 },
  { name: 'Malappuram', id: 9 },
  { name: 'Kozhikode', id: 10 },
  { name: 'Wayanad', id: 11 },
  { name: 'Kannur', id: 12 },
  { name: 'Kasaragod', id: 13 },
];
const ListHotels = ({ api, flag }) => {
  console.log(api, flag, "listPlaces");
  const [list, setList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const [search, setSearch] = useState("");
  const getList = () => {
    setIsLoading(true); // Set loading to true
    post(`/${api}/list`, { id: "all" })
      .then((res) => {
        setList(res.data); // Update list with fetched data
        setSearchResult(res.data)
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

  useEffect(() => {
    console.log(selectedDistrict, "selectedDistrict");
    const filterdData = searchResult.filter((item) => {
      console.log(item, "itemmedicationfileter");
      return item.districtId == selectedDistrict
    })
    setList(filterdData)
  }, [selectedDistrict]);

  useEffect(() => {
    console.log(search,list, "keywordinsidemedical");
    const filterdData = searchResult.filter((item) => {
      console.log(item, "itemmedicationfileter");
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
    console.log(filterdData,"filterdData");
    setList(filterdData)
  }, [search])

  useEffect(() => {
    console.log(searchResult, "searchResult");
  }, [searchResult]);
  const handleDelete = (id) => {
    setIsLoading(true); // Set loading when deleting
    post(`/${api}/delete`, { id })
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
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div>
      <SearchBarContainer>
        <SearchBar placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
        <DistrictDropdown
                districts={districts}
                onChange={handleDistrictChange}
                selectedDistrict={selectedDistrict}
              />
      </SearchBarContainer>

      <MainContainer>

        {isLoading && <CircularLoading />} {/* Show loading spinner */}
        {list.map((item) => (
          <CadContainer key={item.id}>
            <InsideContainer1>
              <ImageView src={item.image} alt={item.name} /> {/* Place image */}
            </InsideContainer1>
            <InsideContainer2>
              <InsideContainer3>
                <p style={{ color: secondary, paddingTop: ".2em" }}>{item.name}</p>
                <Description>
                  <p style={{ fontSize: "12px" }}>{item.description}</p> {/* Place description */}
                </Description>
                <p>Price: {item.price}</p> {/* Place price */}
              </InsideContainer3>
              <InsideContainer4 onClick={() => handleDelete(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
                {/* <ImageView2 src={delete_icon} alt="Delete" /> Delete button */}
              </InsideContainer4>
            </InsideContainer2>
          </CadContainer>
        ))}
      </MainContainer>
    </div>
  );
};

export default ListHotels;

// Styled-components for layout and styling
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  // position: relative;
  padding: 1em;
`;
const SearchBarContainer = styled.div`
height: 50px;
// width: 100%;
background-color: ${secondary};
display: flex;
align-items: center;
padding: .5em 1em;
justify-content: space-between;
`
const SearchBar = styled.input`
height: 32px;
width: 200px;
background-color: ${secondary};
border: white 1px solid;
border-radius: 10px;
color: white;
`


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
  box-shadow: 0 0 5px ${secondary};
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
  color: white;
  cursor: pointer;
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
