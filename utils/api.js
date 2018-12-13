import { allDecks } from './data'
import { AsyncStorage } from 'react-native'

export const FLIPCARDS_KEY = 'FlipCards:decks'

export const saveDataToLocalStorage = async () => {
  try {
    await AsyncStorage.setItem(FLIPCARDS_KEY, JSON.stringify(allDecks))
  } catch (error) {
    console.log('error saving data locally:', error)
  }
}

export const getDecks = async () => {
  try {
    const allDecks = await AsyncStorage.getItem(FLIPCARDS_KEY)
    if (allDecks !== null) return allDecks.json()
  } catch (error) {
    console.log('error getting decks:', error)
  }
}

export const getDeck = id => {
  const decks = getDecks()
  return decks[id]
}

export const saveDeckTitle = async title => {
  try {
    await AsyncStorage.mergeItem(FLIPCARDS_KEY, JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
    )
  } catch (error) {
    console.log('error saving deck title:', error)
  }
}

export const addCardToDeck = async (title, card) => {
  const decks = getDecks()

  const allUpdatedDecks = {
    ...decks,
    [title]: {
      ...decks[title],
      questions: decks[title].questions.concat([card])
    }
  }
  try {
    await AsyncStorage.setItem(FLIPCARDS_KEY, JSON.stringify(allUpdatedDecks))
  } catch (error) {
    console.log('error adding the card to the deck:', error)
  }
}
