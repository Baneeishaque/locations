// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { MapView } from "expo";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
    };
  }

  componentDidMount() {
    this.fetchMarkerData();
  }

  fetchMarkerData() {
    fetch('https://feeds.citibikenyc.com/stations/stations.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson.stationBeanList, 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider="google"
        region={{
          latitude: 40.76727216,
          longitude: -73.99392888,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      
      {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
        const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude,
        };

        const metadata = `Status: ${marker.statusValue}`;

        return (
            <MapView.Marker
                key={index}
                coordinate={coords}
                title={marker.stationName}
                description={metadata}
            />
        );
      })}
      </MapView>
    );
  }
}

class FlatListBasics extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button
          // onPress={onPressLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})


