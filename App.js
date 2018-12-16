import React, { Component } from 'react'
import { saveDataToLocalStorage } from './utils/api'
import Decklist from './screens/Decklist'
import NewDeck from './screens/NewDeck'
import IndividualDeck from './screens/IndividualDeck'
import Quiz from './screens/Quiz'
import AddCard from './screens/AddCard'
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import { View, StatusBar } from 'react-native'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import reducer from './reducers'

const Tabs = createMaterialTopTabNavigator(
  {
    Decks: {
      screen: Decklist
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        title: 'New Deck'
      }
    }
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12
      },
      indicatorStyle: {
        backgroundColor: 'yellow'
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
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)
export default class App extends Component {
  componentDidMount () {
    saveDataToLocalStorage()
  }
  render () {
    return (
      // <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor={'orange'} barStyle='light-content' />
        <AppContainer />
      </View>
      // </Provider>
    )
  }
}
