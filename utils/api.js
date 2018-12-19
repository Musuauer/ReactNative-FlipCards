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

export const _getDecks = async () => {
  try {
    const allDecks = await AsyncStorage.getItem(FLIPCARDS_KEY)
    if (allDecks !== null) return JSON.parse(allDecks)
  } catch (error) {
    console.log('error getting decks:', error)
  }
}

// the following functions were not used any more because they were replaced by Redux

// export const getDeck = async id => {
//   try {
//     const decks = await _getDecks()
//     console.log('decks from getDeck', decks)
//     return decks[id]
//   } catch (error) {
//     console.log('error getting deck:', error)
//   }
// }

// export const saveDeckTitle = async title => {
//   try {
//     await AsyncStorage.mergeItem(FLIPCARDS_KEY, JSON.stringify({
//       [title]: {
//         title,
//         questions: []
//       }
//     })
//     )
//   } catch (error) {
//     console.log('error saving deck title:', error)
//   }
// }

// export const addCardToDeck = async (title, card) => {
//   console.log('addcardtodeck...', title, '...', card)
//   const decks = _getDecks()

//   const allUpdatedDecks = {
//     ...decks,
//     [title]: {
//       ...decks[title],
//       questions: decks[title].questions.concat([card])
//     }
//   }
//   try {
//     await AsyncStorage.setItem(FLIPCARDS_KEY, JSON.stringify(allUpdatedDecks))
//   } catch (error) {
//     console.log('error adding the card to the deck:', error)
//   }
// }
