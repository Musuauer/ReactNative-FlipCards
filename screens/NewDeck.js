import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { addDeckRedux } from '../actions'

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
      <View style={{padding: 10}}>
        <Text>
          What is the title of your new Deck?
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder='Deck title'
          onChangeText={title => this.setState({ title })}
          clearButtonMode='always'
          value={this.state.title}
        />
        <Button
          onPress={this.handleSubmit}
          title='Submit'
          color='#841584'
          accessibilityLabel='Save new deck and navigate to it'
        />

      </View>
    )
  }
}

export default connect()(NewDeck)
