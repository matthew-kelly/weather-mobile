import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { DARK_SKY_API_KEY, GOOGLE_MAPS_API_KEY, CURRENT_LAT, CURRENT_LONG } from 'react-native-dotenv';
import Geocoder from 'react-native-geocoding';
import WeatherIcon from './src/components/WeatherIcon';

Geocoder.init(`${GOOGLE_MAPS_API_KEY}`);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lat: CURRENT_LAT,
      long: CURRENT_LONG
    }
  }

  getWeather = (lat, long) => {
    return fetch(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${long}?units=ca`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          weatherInfo: responseJson
        })
      })
      .catch(e => console.error(e));
  }

  randomLat = () => {
    return Number(Math.random() * Math.floor(90)).toFixed(6);
  }

  randomLong = () => {
    return Number(Math.random() * Math.floor(180)).toFixed(6);
  }

  getLocation = (lat, long) => {
    return Geocoder.from(this.state.lat, this.state.long)
      .then(json => {
        let result = json.results[0];
        this.setState({
          city: `${result.address_components[2].long_name}, ${result.address_components[5].short_name}, ${result.address_components[6].long_name}`
        })
      })
      .catch(e => {
        console.error(e)
      });
  }

  componentDidMount() {
    this.getLocation(this.state.lat, this.state.long);
    this.getWeather(this.state.lat, this.state.long);
  }

  render() {
    let weatherData;
    let currentWeather;
    let currentLocation;
    if (this.state.isLoading) {
      weatherData = <Text>Loading...</Text>
    } else {
      weatherData = <Text style={styles.weather}><Text>{this.state.weatherInfo.currently.temperature}</Text>&deg;C - <Text>{this.state.weatherInfo.currently.summary}</Text></Text>
      currentWeather = <WeatherIcon currentWeather={this.state.weatherInfo} />
      currentLocation = <Text style={styles.city}>{this.state.city}</Text>
    }
    return (
      <View style={styles.container}>
        {currentWeather}
        {weatherData}
        {currentLocation}
        <Text style={styles.footer}>Powered by Dark Sky</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weather: {
    fontSize: 20,
  },
  city: {
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 5,
    fontSize: 16,
  }
});
