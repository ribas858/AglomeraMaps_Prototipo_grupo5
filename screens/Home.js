import React from 'react';
import { Text, View ,StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Block, theme } from 'galio-framework';
import MapView, { Heatmap, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BlueMapStyles from '../mapStyles/mapBlue.json';
import argonTheme from '../constants/Theme';




import moment from 'moment';
const { width } = Dimensions.get('screen');

var date = moment().utcOffset('').format('HH:MM');
class Home extends React.Component {
  state = {
    region: null,
    places: [
      {
        id: 1,
        title: 'Total de Pessoas:',
        description: 'Horario:',
        n: '45',
        hr: date,
        local: "BIG BOX",
        latitude: -15.793939,
        longitude: -47.882709,

      },
      {
        id: 2,
        title: 'Total de Pessoas:',
        description: 'Horario:',
        n: '29',
        hr: date,
        local: "BIG BOX",
        latitude: -15.920860,
        longitude: -48.058215,
      },
      {
        id: 3,
        title: 'Total de Pessoas:',
        description: 'Horario:',
        n: '12',
        hr: date,
        local: "BIG BOX",
        latitude: -15.819797,
        longitude: -48.131063,
      }
    ]
  };
  
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.mapView.animateCamera({

  //       center: {
  //         latitude: -15.920860,
  //         longitude:  -48.058215
  //       }
        
  //     }, 2000);
    
  //   }, 6000);
  // }

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
    this.state.places[1].mark.showCallout();
  }

  async componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
          region: {
            latitude,
            longitude,
            longitudeDelta: 0.0199,
            latitudeDelta: 0.0187,
          }
        });
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    )

  }

  renderArticles = () => {
    const { } = this.state.places[0];
    const { region } = this.state;
    return (
      
                      
                      <View style={styles.container}>
                      
                      <MapView
                        ref={ map => this.mapView = map}
                        region={region}
                        style={styles.mapView}
                        customMapStyle={ BlueMapStyles}
                        // onMapReady={this._mapReady}
                        showsUserLocation
                        loadingEnabled
                        provider={PROVIDER_GOOGLE}
                        >

                        { this.state.places.map(place => (
                            <Marker
                            coordinate={{
                              latitude: place.latitude,
                              longitude: place.longitude,
                            }} ref={mark => place.mark = mark} title={place.n} description={place.local} key={place.id}>

                            
                            <Image style={styles.marcador} source={require('../assets/imgs/marker.png')}/>

                            </Marker>
                            
                            
                            
                        ))}
                          
                      </MapView>
                      <ScrollView
                        style={styles.placesContainer}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        onMomentumScrollEnd={e => {
                          const scrolled = e.nativeEvent.contentOffset.x;
                          
                          

                          const place = (scrolled>0)
                            ? scrolled / Dimensions.get('window').width
                            : 0;

                          const { latitude, longitude, mark} = this.state.places[place];

                          
                              this.mapView.animateCamera({
                        
                                center: {
                                  latitude,
                                  longitude,
                                },
                                zoom: 14
                                
                                
                                
                              }, 2000);

                              setTimeout(() => {
                                mark.showCallout();
                              },500);

                        }}
                        >

                        { this.state.places.map(place => (
                          <View key={place.id} style={styles.place}>
                            <View style={styles.place1}>
                              <View style={{ alignItems: 'stretch' }}>
                                <Text style={styles.texto1}> {place.title} {place.n}</Text>
                                <Text style={styles.texto1}> {place.description} {place.hr}</Text>
                              </View>
                              <Image style={styles.marcador1} source={require('../assets/imgs/pessoas.png')}/>
                            </View>
                            
                          </View>
                        ))}

                      </ScrollView>
                      </View>
                      

      
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    width: Dimensions.get('window').width - 7,
    height: Dimensions.get('window').height,
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  marcador: {
    width: 32,
    height: 60,
  },
  marcador1: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  placesContainer: {
    width: '100%',
    maxHeight: 60,
    backgroundColor: 'white',
  },
  place: {
    width: Dimensions.get('window').width - 7.32,
    maxHeight: 60,
    backgroundColor: '#013E58',
    marginHorizontal: 3.66,
    justifyContent: "center",
    alignItems: 'center',
    
  },
  place1: {
    width: Dimensions.get('window').width - 20,
    maxHeight: 60,
    backgroundColor: 'white',
    borderRadius: 2.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
    
  },
  texto1: {
    color: argonTheme.COLORS.HEADER,
    fontWeight: "bold"
  }
});

export default Home;
