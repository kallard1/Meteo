import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

import FadeInView from '../animation/FadeInView'

import 'moment/locale/fr'

moment.locale('fr')

export default class Row extends React.Component {

  static propTypes = {
    day: PropTypes.object,
    index: PropTypes.number,
  }

  day () {
    let day = moment(this.props.day.dt * 1000).format('dddd')

    return <Text style={[style.white, style.bold]}>{day.toUpperCase()}</Text>
  }

  date () {
    let date = moment(this.props.day.dt * 1000).format('DD/MM')

    return <Text style={style.white}>{date}</Text>
  }

  hour () {
    let hour = moment(this.props.day.dt * 1000).format('HH:mm')

    return <Text style={style.white}>{hour}</Text>
  }

  icon (size = 50) {
    const type = this.props.day.weather[0].main.toLowerCase()

    let image
    switch (type) {
      case 'clouds':
        image = require('./icons/weather-cloudy.png')
        break
      case 'rain':
        image = require('./icons/weather-rainy.png')
        break
      case 'snow':
        image = require('./icons/weather-snowy.png')
        break
      default:
        console.log(type)
        image = require('./icons/weather-sunny.png')
        break
    }

    return <Image source={image} style={{width: size, height: size}}/>
  }

  render () {

    if (this.props.index === 0) {
      return (
        <FadeInView delay={this.props.index * 50}>
          <View style={[style.flex, style.view, style.firstElement]}>
            <View>
              <Text style={{fontSize: 22, color: '#FFFFFF'}}>{this.day()} {this.date()} - {this.hour()}</Text>
              {this.icon(70)}
            </View>
            <Text style={[style.temp, {fontSize: 40}]}>{Math.round(this.props.day.main.temp)}˚C</Text>
          </View>
        </FadeInView>
      )
    } else {
      return (
        <FadeInView>
          <View style={[style.flex, style.view]}>
            <View style={style.flex}>
              {this.icon()}
              <Text style={{marginLeft: 10, color: '#FFFFFF'}}>{this.day()} {this.date()} - {this.hour()}</Text>
            </View>
            <Text style={style.temp}>{Math.round(this.props.day.main.temp)}˚C</Text>
          </View>
        </FadeInView>
      )
    }
  }
};

const style = StyleSheet.create({

  white: {
    color: '#FFFFFF',
  },

  bold: {
    fontWeight: 'bold',
  },

  flex: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  firstElement: {
    backgroundColor: '#333333',
  },

  view: {
    backgroundColor: '#000000',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#575757',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },

  temp: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
  }
})