import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const apiKey = '1bd8098eb160957200ff018ee5cdf5c3';

  const backToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('Current Position:', position);
            console.log('Latitude:', position.coords.latitude);
            console.log('Longitude:', position.coords.longitude);

            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setError('Unable to retrieve your location.');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude !== null && longitude !== null) {
        try {
          const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={apiKey}'
          );
          setWeatherData(response.data);
          setError('');
        } catch (err) {
          setError('Unable to fetch weather data.');
          setWeatherData(null);
        }
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, apiKey]);

  return (
    <MainContainer>
      <BackButton onClick={backToHome}>Home</BackButton>
      <Container>
        <h1>Current Weather by Location</h1>
        {error && <ErrorText>{error}</ErrorText>}
        {weatherData && (
          <WeatherInfo>
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <h3>{Math.round(weatherData.main.temp)}°C</h3>
            <WeatherDetails>
              <div>
                <strong>Humidity:</strong> {weatherData.main.humidity}%
              </div>
              <div>
                <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
              </div>
              <div>
                <strong>Condition:</strong> {weatherData.weather[0].description}
              </div>
            </WeatherDetails>
          </WeatherInfo>
        )}
      </Container>
    </MainContainer>
  );
};

export default Location;

// Styles (similar to before)


const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #87ceeb, #f0f8ff);
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;

  h1 {
    color: #333;
  }
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
  color: #333;
  text-align: left;

  h2 {
    margin-bottom: 10px;
  }

  h3 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
`;

const WeatherDetails = styled.div`
  font-size: 1rem;
  line-height: 1.6;

  div {
    margin-bottom: 10px;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 20px;
`;
