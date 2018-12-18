import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { addCardToDeckRedux } from '../actions'
import { connect } from 'react-redux'
import { sharedStyles } from '../utils/sharedStyles'

class AddCard extends Component {
  static navigationOptions = {
    title: 'New Question'
  }
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
      <View style={sharedStyles.container}>
        <TextInput
          style={sharedStyles.textInput}
          placeholder='Type the question here'
          onChangeText={questionText => this.setState({ questionText })}
        />
        <TextInput
          style={sharedStyles.textInput}
          placeholder='Type its answer here'
          onChangeText={answerText => this.setState({ answerText })}
        />
        <View style={sharedStyles.buttonsContainer}>
          <TouchableOpacity
            style={sharedStyles.button}
            onPress={this.handleSubmit}
          >
            <Text style={sharedStyles.buttonText}>
            Submit
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default connect(null)(AddCard)
