import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native'
import { Deck } from '../components/Deck'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { getDecks } from '../actions'

class Decklist extends Component {
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
    console.log('decklist props', this.props.decks)
    const { decks } = this.props

    if (!decks) {
      return (
        <View style={styles.center}>
          <Text style={[ styles.center, {marginTop: 100} ]}>
          loading data...
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.center}>
        {decks &&
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

class DecklistContainer extends Component {
  state = {
    ready: false
  }

  componentDidMount () {
    this.props.dispatch(getDecks())
      .then(() => this.setState(() => ({ready: true})))
  }

  render () {
    const { ready } = this.state
    console.log('decklistcontainerPROPS', this.props.decks)

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <Decklist
        decks={this.props.decks}
      />
    )
  }
}

function mapStateToProps (state) {
  console.log('statefrom connect', state)
  return {
    decks: Object.values(state).map(deck => ({
      title: deck.title,
      cardsNumber: deck.questions.length
    }))
  }
}

export default connect(mapStateToProps)(DecklistContainer)

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
