import {
  RECEIVE_DECKS,
  ADD_CARD_TO_DECK,
  ADD_DECK
} from '../actions'

const FlipCardsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.allDecks
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card]
        }
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    default:
      return state
  }
}

export default FlipCardsReducer
