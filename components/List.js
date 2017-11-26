import React from 'react'
import { Image, ListView, View } from 'react-native'
import axios from 'axios'
import removeAccents from 'remove-accents'

import { Spinner } from 'nachos-ui'

import WeatherRow from './weather/Row'

import style from '../Style'

export default class List extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: `Prévisions météos de ${navigation.state.params.city}`,
      tabBarIcon: () => {
        return <Image source={require('./icons/home.png')}/>
      }
    }
  }

  constructor (props) {
    super(props)

    /**
     * TODO: Méthode qui remplace les caractères accentués
     * @type {{city: string, report: null}}
     */

    this.state = {
      city: removeAccents(this.props.navigation.state.params.city),
      report: null,
    }

    setTimeout(() => {
      this.fetchWeather()
    }, 1000)

    this.fetchWeather()
  }

  fetchWeather () {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&mode=json&units=metric&cnt=50&APPID=203e94709ff802f6350297c64e0b8fbc`)
      .then((response) => {
        this.setState({report: response.data})
      })
  }

  render () {
    if (this.state.report === null) {
      return (
        <View style={[style.container, {flexGrow: 1, alignItems: 'center', justifyContent: 'center'}]}>
          <Spinner color={'black'}/>
        </View>
      )
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

      return (
        <View style={style.container}>
          <ListView
            dataSource={ds.cloneWithRows(this.state.report.list)}
            renderRow={(rowData, h, index) => <WeatherRow day={rowData} index={parseInt(index, 10)}/>}
          />
        </View>
      )
    }
  };
}
