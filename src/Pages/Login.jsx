import React, { useState } from 'react'
import styled from 'styled-components';
import kerala_bg from '../assets/kerala-bg.webp'
import { post } from '../actions/api';
const Login = ({setUser}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = () => {
    post(`/user/login`, {
      "email":email,
      "password":password
    }).then(res => {
     
      if(res.user.type){
      setUser()
      console.log(res,'admin');
      }
    })
  }
  return (
    <MainContainer bg={kerala_bg}>
       <FormContainer>
       <h1>K-Tourism</h1>
       </FormContainer>
       <FormContainer >
        <LoginContainer>
          <h1>Login</h1>
          <TextBoxContainer>
          <InputBox type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
          <InputBox type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
          </TextBoxContainer>
          <LoginButton onClick={handleLogin}>Login</LoginButton>
        </LoginContainer>

       </FormContainer>
    </MainContainer>
    
  )
}

export default Login

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  gap: .8em;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #091913;
`;

const FormContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 1em;
 flex:1;
 height: 100%;
 align-content: center;
 justify-content: center;
`;
const TextBoxContainer = styled.div`
display: flex;
flex-direction: column;
gap: 1em;
`;

const LoginContainer = styled.div`
width: 300px;
padding: 20px;
background: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
border-radius: 10px; /* Rounded corners for the glass effect */
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); /* Shadow for depth */
backdrop-filter: blur(10px); /* Apply blur effect */
-webkit-backdrop-filter: blur(10px); /* Compatibility with Webkit browsers */
border: 1px solid rgba(255, 255, 255, 0.18); /* Border with slight transparency */
color: #fff; /* White text color */
text-align: center; /* Center text */

`
const InputBox = styled.input`
padding: 10px;
font-size: 16px;
border-radius: 5px;
border: none;
outline: none;
`
const LoginButton = styled.button`
margin-top: 10px;
padding: 10px;
font-size: 16px;
border-radius: 5px;
border: none;
outline: none;
`