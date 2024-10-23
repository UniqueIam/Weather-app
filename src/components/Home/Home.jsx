import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();

  const byCity = () => {
    navigate('/content');
  };

  const byLocation = () => {
    navigate('/Location');
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <Title>Weather Application</Title>
        <ButtonContainer>
          <StyledButton onClick={byCity}>
            Weather report by City Name
          </StyledButton>
          <StyledButton onClick={byLocation}>
            Weather report by Current Location
          </StyledButton>
        </ButtonContainer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default Home;

// Styled components
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

const ContentWrapper = styled.div`
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px 25px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;
