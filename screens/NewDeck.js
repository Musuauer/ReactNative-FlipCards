import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addDeckRedux } from '../actions'
import { sharedStyles } from '../utils/sharedStyles'

class NewDeck extends Component {
  state = {
    title: ''
  }

  handleSubmit = () => {
    const { title } = this.state

    const deck = {
      title: title,
      questions: []
    }
    this.props.dispatch(addDeckRedux(deck))
    this.setState(
      { title: '' },
      () => {
        return this.props.navigation.navigate('IndividualDeck', {
          title: title
        })
      }
    )
  }

  render () {
    return (
      <View style={sharedStyles.container}>
        <Text style={{ fontSize: 20 }}>
          What is the title of your new Deck?
        </Text>
        <TextInput
          style={sharedStyles.textInput}
          placeholder='Deck title'
          onChangeText={title => this.setState({ title })}
          clearButtonMode='always'
          value={this.state.title}
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

export default connect()(NewDeck)
