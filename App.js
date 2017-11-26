import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { TabNavigator } from 'react-navigation'

import Home from './components/Home'
import About from './components/About'

import style from './Style'

const Tabs = TabNavigator({
  Home: {screen: Home},
  About: {screen: About},
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: '#000000',
      borderTopWidth: 1,
      borderColor: '#4e4e4e'
    },
    indicatorStyle: {
      height: 2,
      backgroundColor: '#FFFFFF'
    }
  }
})

export default class App extends React.Component {
  render () {
    return (
      <View style={style.view}>
        <StatusBar hidden={true}/>
        <Tabs/>
      </View>
    )
  }
}
