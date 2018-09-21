import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class WeatherIcon extends Component {

  render() {
    let weatherImage;
    switch (this.props.currentWeather.currently.icon) {
      case 'clear-day':
        weatherImage = '⛅️';
        break;
      case 'clear-night':
        weatherImage = '🌃';
        break;
      case 'rain':
        weatherImage = '🌧';
        break;
      case 'snow':
        weatherImage = '⛄️';
        break;
      case 'sleet':
        weatherImage = '🌨';
        break;
      case 'wind':
        weatherImage = '🌬';
        break;
      case 'fog':
        weatherImage = '🌁';
        break;
      case 'cloudy':
        weatherImage = '☁️';
        break;
      case 'partly-cloudy-day':
        weatherImage = '🌤';
        break;
      case 'partly-cloudy-night':
        weatherImage = '☁️';
        break;
      case 'hail':
        weatherImage = '🌨';
        break;
      case 'thunderstorm':
        weatherImage = '⛈';
        break;
      case 'tornado':
        weatherImage = '🌪';
        break;
      default:
        weatherImage = 'Loading...';
    }

    return (
      <Text style={styles.weatherImage}>{weatherImage}</Text>
    )
  }
}

const styles = StyleSheet.create({
  weatherImage: {
    fontSize: 90,
  },
});
