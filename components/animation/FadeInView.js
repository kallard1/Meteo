import React from 'react'
import { Animated, Dimensions } from 'react-native'

export default class FadeInView extends React.Component {

  constructor (props) {
    super(props)

    let {height, width} = Dimensions.get('window')

    this.state = {
      pane: new Animated.ValueXY({x: width, y: 0})
    }
  }

  componentDidMount () {
    Animated.sequence([
      Animated.delay(this.props.delay),
      Animated.spring(
        this.state.pane, {
          toValue: {x: 0, y: 0}
        }
      )
    ]).start()
  }

  render () {
    return (
      <Animated.View
        style={{
          ...this.props.style,
          transform: this.state.pane.getTranslateTransform()
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  };
}
