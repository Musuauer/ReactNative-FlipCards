import React, { Component } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { getDeck } from '../utils/api'
import { AppLoading } from 'expo'
import { deckStyles } from '../components/Deck'
import { connect } from 'react-redux'

class IndividualDeck extends Component {
  state = {
    ready: false,
    deck: {}
  }
  componentDidMount () {
    this.setDeck()
  }

  setDeck = () => {
    const title = this.props.navigation.getParam('title', 'React')
    this.props.decks[title].then(deck => this.setState({ deck, ready: true }))
  }

  render () {
    console.log('individualdeck PROPS', this.props)

    const { deck, ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    console.log('deckkk', deck)
    const { title, questions } = deck
    const cardsNumber = questions.length
    console.log(questions)

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
          onPress={() => this.props.navigation.navigate('Quiz')}
          title='Start Quiz'
          color='darkblue'
          accessibilityLabel='Start Quiz'
        />
        <Button
          onPress={() => this.props.navigation.navigate('AddCard')}
          title='New Question'
          color='darkblue'
          accessibilityLabel='Add a new question'
        />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    decks: Object.values(state).map(deck => ({
      title: deck.title,
      cardsNumber: deck.questions.length
    }))
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
