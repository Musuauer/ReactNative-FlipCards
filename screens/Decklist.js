import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { getDecks } from '../utils/api'
import { Deck } from '../components/Deck'

export default class Decklist extends Component {
  state = {
    allDecks: []
  }
  componentDidMount () {
    getDecks().then(allDecks =>
      this.setState({ allDecks })
    )
  }

  _keyExtractor = (item, index) => item.title

  goToDeck = (deck) => {
    this.props.navigation.navigate('IndividualDeck', {
      deck
    })
  }

  _renderItem = ({item}) => (
    <Deck
      id={item.title}
      onPressItem={this.goToDeck}
      title={item.title}
      cardsNumber={item.cardsNumber}
    />
  )

  render () {
    const { allDecks } = this.state

    let decks
    allDecks && (decks = Object.values(allDecks).map(deck => ({
      title: deck.title,
      cardsNumber: deck.questions.length
    }))
    )

    console.log('alldecks', decks)

    return (
      <View style={styles.decklistContainer}>
        {allDecks &&
        <FlatList
          contentContainerStyle={styles.deckList}
          data={decks}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckListContainer: {
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
