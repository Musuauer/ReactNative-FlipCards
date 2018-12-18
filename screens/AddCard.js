import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import { addCardToDeckRedux } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {
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
    const title = this.props.navigation.getParam('title')

    this.props.dispatch(addCardToDeckRedux(title, card))
    this.props.navigation.goBack()
  }

  render () {
    console.log('add card props', this.props)

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

export default connect(null)(AddCard)
