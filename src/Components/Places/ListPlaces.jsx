import React, { useEffect, useState } from 'react'
import { post } from '../../actions/api'
import styled from 'styled-components'
import delete_icon from '../../assets/delete_icon.png'
const ListPlaces = ({ apiUrl,flag }) => {
    // const [places, setPlaces] = useState([])
    const [list, setList] = useState([])

    const getList = () =>{
        console.log(apiUrl, "apiUrl");
        post(`/${apiUrl}/list`, {
            "districtId": "all"
        }).then(res => {
            console.log(res, "places");
            setList(res.data)
        })
    }
    useEffect(() => {
        getList()
    }, [flag])
    useEffect(() => {
       getList()
    }, [])

    const handleDelete = (id, url) => {
        post(`${url}/delete`, {
            "id": id
        }).then(res => {
            console.log(res);
            // alert("Place deleted successfully")
            getList()
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <MainContainer>
            {
                list.map((item) => {
                    return (
                        <CadContainer>
                            <InsideContainer1 flex="3">
                                <ImageView src={item.image} alt="" />
                            </InsideContainer1>
                            <InsideContainer2>
                                <InsideContainer3>
                                    <p style={{ color: '#5e72e4',paddingTop:".2em" }}>{item.name}</p>
                                    <Description><p style={{fontSize:"12px"}}>{item.description}</p></Description>
                                    <p>Price: {item.price}</p>
                                </InsideContainer3>
                                <InsideContainer4 onClick={() => {handleDelete(item.id, apiUrl) }}>
                                    <ImageView2 src={delete_icon} alt="" />
                                </InsideContainer4>
                            </InsideContainer2>
                        </CadContainer>
                    )
                })
            }
        </MainContainer>
    )
}

export default ListPlaces
const MainContainer = styled.div`
  display: flex;
flex-direction: column;
gap: .8em;
`;
const Description = styled.div`
width: 200px; /* Container width to create overflow */
height: 43px; /* Fixed height to determine number of visible lines */
overflow: hidden; /* Hide overflowing content */
display: -webkit-box; /* Webkit box model */
-webkit-box-orient: vertical; /* Vertical orientation for box layout */
-webkit-line-clamp: 3; /* Clamp to 
text-overflow: ellipsis;

`
const CadContainer = styled.div`
  display: flex;
     gap: .8em;
  box-shadow: 0 0 5px #5e72e4;
  border-radius: 10px;
`;
const InsideContainer1 = styled.div`
// flex:${props => props.flex};
  display: flex;
  flex-direction: column;
  gap: .8em;
    width: 180px;
    
`
const InsideContainer2 = styled.div`
flex:1;
  display: flex;
  gap: .8em;
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
`
const InsideContainer3 = styled.div`
flex:7;
  display: flex;
  flex-direction: column;
  gap: .8em;
`
const InsideContainer4 = styled.div`
flex:1;
  display: flex;
  flex-direction: column;
  gap: .8em;
background-color: red;
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
height:120px;
justify-content: center;
align-items: center;
`

const ImageView = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`
const ImageView2 = styled.img`
  width: 60%;
  height: 60%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`