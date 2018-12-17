import React, { Component } from 'react'
import { saveDataToLocalStorage } from './utils/api'
import DecklistContainer from './screens/DecklistContainer'
import NewDeck from './screens/NewDeck'
import IndividualDeck from './screens/IndividualDeck'
import Quiz from './screens/Quiz'
import AddCard from './screens/AddCard'
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const Tabs = createMaterialTopTabNavigator(
  {
    Decks: {
      screen: DecklistContainer
    },
    NewDeck: {
      screen: NewDeck
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 16
      },
      tabStyle: {
        backgroundColor: 'darkblue'
      },
      pressOpacity: 5
    }
  }
)

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    },
    // Add titles here or in component ------------*
    IndividualDeck: IndividualDeck,
    Quiz: Quiz,
    AddCard: AddCard
  },
  {
    initialRouteName: 'Home',
    /* The default header config */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#ba8c28'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

const MyStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

let store = createStore(reducer, middleware)
export default class App extends Component {
  componentDidMount () {
    saveDataToLocalStorage()
  }
  render () {
    console.log('app component mounted')
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MyStatusBar translucent backgroundColor={'darkblue'} barStyle='light-content' />
          <AppContainer />
        </View>
      </Provider>
    )
  }
}
