import { StyleSheet } from 'react-native'

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
  buttonsContainer: {
    marginTop: 30
  },
  button: {
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'darkblue',
    padding: 10,
    width: 170,
    marginTop: 30
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 20
  },
  textInput: {
    height: 50,
    width: 230,
    marginTop: 30,
    fontSize: 20
  }
})
