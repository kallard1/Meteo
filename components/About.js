import React from 'react'
import { Button, Image, View, Text, StyleSheet } from 'react-native'

import style from '../Style'

export default class About extends React.Component {

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./icons/account-circle.png')}/>
    }
  }

  render () {
    return (
      <View style={style.container}>
        <Text>A propos de Ma Météo</Text>
        <Text>Version: 0.1.0</Text>
      </View>
    )
  };
}
