import { showLoading, hideLoading } from 'react-redux-loading'
import { _getDecks } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const ADD_DECK = 'ADD_DECK'

export const receiveDecksRedux = allDecks => ({
  type: RECEIVE_DECKS,
  allDecks
})

export const getDecks = () => dispatch => {
  dispatch(showLoading)

  return _getDecks()
    .then(allDecks => dispatch(receiveDecksRedux(allDecks)))
    .then(() => dispatch(hideLoading()))
}

export const addCardToDeckRedux = (title, card) => ({
  type: ADD_CARD_TO_DECK,
  title,
  card
})

export const addDeckRedux = deck => ({
  type: ADD_DECK,
  deck
})
