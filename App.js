import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { DARK_SKY_API_KEY, CURRENT_LAT, CURRENT_LONG } from 'react-native-dotenv';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lat: CURRENT_LAT,
      long: CURRENT_LONG
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    return fetch(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${this.state.lat},${this.state.long}?units=ca`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          weatherInfo: responseJson
        })
      })
      .catch(e => console.error(e));
  }

  render() {
    let weatherData;
    if (this.state.isLoading) {
      weatherData = <Text>Loading</Text>
    } else {
      weatherData = <Text><Text>{this.state.weatherInfo.currently.temperature}</Text>&deg;C - <Text>{this.state.weatherInfo.currently.summary}</Text></Text>
    }
    return (
      <View style={styles.container}>
        {weatherData}
        <Text>Powered by Dark Sky</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
