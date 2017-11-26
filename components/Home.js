import React from 'react'
import { Image, Keyboard, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { Button, Input } from 'nachos-ui'

import List from './List'

import style from '../Style'

class Search extends React.Component {

  static navigationOptions = {
    title: 'Rechercher une ville',
    tabBarIcon: () => {
      return <Image source={require('./icons/home.png')}/>
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      city: 'La Bassée'
    }
  }

  setCity (city) {
    this.setState({
      city: city
    })
  }

  submit () {
    Keyboard.dismiss()
    this.props.navigation.navigate('Result', {city: this.state.city})
  }

  render () {
    return (
      <View style={style.container}>
        <Input
          underlineColorAndroid={'transparent'}
          placeholder='Ville'
          value={this.state.city}
          onChangeText={(text) => this.setCity(text)}
          onSubmitEditing={() => this.submit()}
        />
        <Button kind='squared' style={{marginTop: 5}} type='primary' onPress={() => this.submit()}>
          Recherche
        </Button>
      </View>
    )
  };
}

const navigationOptions = {
  headerStyle: style.header,
  headerTitleStyle: style.headerTitle,
  headerTintColor: '#FFFFFF'
}

export default StackNavigator({

  Search: {
    screen: Search,
    navigationOptions
  },

  Result: {
    screen: List,
    navigationOptions
  },
})
