import React, { useState } from 'react';
import styled from 'styled-components';
import kerala_bg from '../assets/kerala-bg.webp';
import { post } from '../actions/api';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');

    // Validation
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) { // Example password validation
      setErrorMessage('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await post(`/user/login`, {
        email,
        password,
      });
  
      if (res.user?.type) {
        setUser(res.user); // Pass user data to setUser
        localStorage.setItem('userId', res.user.id); // Store user ID in localStorage
        console.log('Login successful');
      } else {
        setErrorMessage('Invalid login credentials.');
      }
    } catch (error) {
      setErrorMessage('Error during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer bg={kerala_bg}>
      <FormContainer>
        <h1>K-Tourism</h1>
      </FormContainer>
      <FormContainer>
        <LoginContainer>
          <h1>Login</h1>
          <TextBoxContainer>
            {/* <label htmlFor="email">Email:</label> */}
            <InputBox
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(''); // Clear error message on input change
              }}
            />
            {/* <label htmlFor="password">Password:</label> */}
            <InputBox
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(''); // Clear error message on input change
              }}
            />
          </TextBoxContainer>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <LoginButton onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>
        </LoginContainer>
      </FormContainer>
    </MainContainer>
  );
};

export default Login;

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  gap: 0.8em;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #091913;
`;

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  flex: 1;
  height: 100%;
  align-content: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 300px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  text-align: center;
`;

const TextBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const InputBox = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  outline: none;
`;

const LoginButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  outline: none;
  background: white;
  color: black;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }

  &:disabled {
    cursor: not-allowed;
    background: #b0b0b0;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;
