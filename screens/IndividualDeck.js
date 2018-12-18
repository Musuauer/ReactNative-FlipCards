import React, { Component } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { deckStyles } from '../components/Deck'
import { connect } from 'react-redux'

class IndividualDeck extends Component {
  navigateToAddCard = () => {
    this.props.navigation.navigate('AddCard', {
      title: this.props.thisDeck[0].title
    })
  }

  navigateToQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      title: this.state.title
    })
  }

  render () {
    console.log('individualdeck PROPS', this.props)

    const { title, cardsNumber } = this.props.thisDeck[0]

    return (
      <View style={styles.center}>
        <View style={deckStyles.deck}>
          <Text style={deckStyles.title}>
            {title}
          </Text>
          <Text style={deckStyles.cardsNumber}>
            {cardsNumber} cards
          </Text>
        </View>
        <Button
          onPress={this.navigateToQuiz}
          title='Start Quiz'
          color='darkblue'
          accessibilityLabel='Start Quiz'
        />
        <Button
          onPress={this.navigateToAddCard}
          title='New Question'
          color='darkblue'
          accessibilityLabel='Add a new question'
        />
      </View>
    )
  }
}

function mapStateToProps (state, props) {
  const decks = Object.values(state).map(deck => ({
    title: deck.title,
    cardsNumber: deck.questions.length
  }))
  const title = props.navigation.getParam('title')

  return {
    thisDeck: decks.filter(deck => deck.title === title)
  }
}
export default connect(mapStateToProps)(IndividualDeck)

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deckList: {
    flex: 1,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
