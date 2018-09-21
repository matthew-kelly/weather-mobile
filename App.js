import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { DARK_SKY_API_KEY, CURRENT_LAT, CURRENT_LONG } from 'react-native-dotenv';
import WeatherIcon from './src/components/WeatherIcon';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lat: CURRENT_LAT,
      long: CURRENT_LONG
    }
  }

  componentDidMount() {
    // this.getWeather(this.state.lat, this.state.long);
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
    return Math.random() * Math.floor(90);
  }

  randomLong = () => {
    return Math.random() * Math.floor(180);
  }

  newRandomLocation = () => {
    let lat = this.randomLat();
    let long = this.randomLong();
    this.getWeather(lat, long);
    this.setState({
      lat,
      long,
    })
  }

  render() {
    let weatherData;
    let currentWeather;
    if (this.state.isLoading) {
      weatherData = <Text>Loading...</Text>
    } else {
      weatherData = <Text style={styles.weather}><Text>{this.state.weatherInfo.currently.temperature}</Text>&deg;C - <Text>{this.state.weatherInfo.currently.summary}</Text></Text>
      currentWeather = <WeatherIcon currentWeather={this.state.weatherInfo} />
    }
    return (
      <View style={styles.container}>
        {currentWeather}
        {weatherData}
        <Text>lat: {this.state.lat}, long: {this.state.long}</Text>
        <Button onPress={this.newRandomLocation} title='New Location'></Button>
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
    fontSize: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 5,
    fontSize: 16,
  }
});
