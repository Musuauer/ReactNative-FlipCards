import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export const Deck = ({ title, cardsNumber }) => (
  <View style={styles.deck}>
    {console.log(title, cardsNumber)}
    <Text style={styles.title}>
      {title}
    </Text>
    <Text style={styles.cardsNumber}>
      {cardsNumber} cards
    </Text>
  </View>
)

const styles = StyleSheet.create({
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
