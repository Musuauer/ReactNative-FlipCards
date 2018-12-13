import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { saveDataToLocalStorage } from './utils/api'
import Decklist from './components/Decklist'

export default class App extends Component {
  componentDidMount () {
    saveDataToLocalStorage()
  }

  render () {
    return (
      <View style={styles.container}>

        <Decklist />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
