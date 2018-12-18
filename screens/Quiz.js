import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    }
  }
  state = {
    title: '',
    questionsLeft: []
  }
  componentDidMount () {
    const deck = this.props.navigation.getParam('deck')
    this.setState({ title: deck.title, questionsLeft: deck.questions })
  }
  render () {
    console.log('quiz props', this.props)
    console.log('quiz STATE', this.state)
    return (
      <Text>
       Questions left: {this.state.questionsLeft.length}
      </Text>
    )
  }
}
