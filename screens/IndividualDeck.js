import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { deckStyles } from '../components/Deck'
import { sharedStyles } from '../utils/sharedStyles'
import { connect } from 'react-redux'

class IndividualDeck extends Component {
  navigateToAddCard = () => {
    this.props.navigation.navigate('AddCard', {
      title: this.props.thisDeck[0].title
    })
  }

  navigateToQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      title: this.props.thisDeck[0].title,
      deck: this.props.thisDeck[0]
    })
  }

  render () {
    const { title, questions } = this.props.thisDeck[0]
    const cardsNumber = questions.length

    return (
      <View style={sharedStyles.container}>

        <View style={deckStyles.deck}>
          <Text style={deckStyles.title}>
            {title}
          </Text>
          <Text style={deckStyles.cardsNumber}>
            {cardsNumber} cards
          </Text>
        </View>
        <View style={sharedStyles.buttonsContainer}>
          <TouchableOpacity
            style={sharedStyles.button}
            onPress={this.navigateToQuiz}
          >
            <Text style={sharedStyles.buttonText}>
              Start Quiz
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={sharedStyles.button}
            onPress={this.navigateToAddCard}
          >
            <Text style={sharedStyles.buttonText}>
              New Question
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

function mapStateToProps (state, props) {
  const decks = Object.values(state).map(deck => ({
    title: deck.title,
    questions: deck.questions
  }))
  const title = props.navigation.getParam('title')

  return {
    thisDeck: decks.filter(deck => deck.title === title)
  }
}
export default connect(mapStateToProps)(IndividualDeck)
