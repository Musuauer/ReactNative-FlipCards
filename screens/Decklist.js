import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { Deck } from '../components/Deck'
import { AppLoading } from 'expo'

export default class Decklist extends Component {
  state = {
    ready: false,
    allDecks: []
  }
  componentDidMount () {
    getDecks().then(allDecks =>
      this.setState({ allDecks, ready: true })
    )
  }

  _keyExtractor = (item, index) => item.title

  _goToDeck = (title) => {
    this.props.navigation.navigate('IndividualDeck', {
      title
    })
  }

  _renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this._goToDeck(item.title)}>
      <Deck
        id={item.title}
        title={item.title}
        cardsNumber={item.cardsNumber}
      />
    </TouchableOpacity>
  )

  render () {
    const { allDecks, ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    let decks
    decks = Object.values(allDecks).map(deck => ({
      title: deck.title,
      cardsNumber: deck.questions.length
    }))

    console.log('decks', decks)

    return (
      <View style={styles.center}>
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
