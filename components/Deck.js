import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export const Deck = ({ title, cardsNumber }) => (
  <View style={deckStyles.deck}>
    <Text style={deckStyles.title}>
      {title}
    </Text>
    <Text style={deckStyles.cardsNumber}>
      {cardsNumber} cards
    </Text>
  </View>
)

export const deckStyles = StyleSheet.create({
  deck: {
    width: 270,
    height: 180,
    backgroundColor: 'darkblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    fontSize: 42,
    color: 'white'
  },
  cardsNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    color: 'white'
  }
})
