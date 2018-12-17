import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { addCardToDeck } from '../utils/api'

export default class AddCard extends Component {
  state = {
    questionText: '',
    answerText: ''
  }

  handleSubmit = () => {
    const { questionText, answerText } = this.state
    const card = {
      question: questionText,
      answer: answerText
    }
    const title = this.props.title

    addCardToDeck(title, card)
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder='Type the question here'
          onChangeText={questionText => this.setState({ questionText })}
        />
        <TextInput
          style={{height: 40}}
          placeholder='Type its answer here'
          onChangeText={answerText => this.setState({ answerText })}
        />
        <Button
          onPress={this.handleSubmit}
          title='Submit'
          color='#841584'
          accessibilityLabel='Save card and go back'
        />

      </View>
    )
  }
}
