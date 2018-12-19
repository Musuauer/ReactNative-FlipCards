import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { sharedStyles } from '../utils/sharedStyles'

export default class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerBackImage: null
    }
  }
  state = {
    title: '',
    questions: [],
    questionsLeft: [],
    showAnswer: false,
    showResults: false,
    correctAnswers: 0
  }

  componentDidMount () {
    const deck = this.props.navigation.getParam('deck')
    const { title, questions } = deck
    this.setState({ title, questions, questionsLeft: questions })
  }

  nextQuestion = () => {
    console.log('NEXT QUESTION')
    this.state.questionsLeft.length > 1
      ? this.setState(prevState => ({
        questionsLeft: [...prevState.questionsLeft.splice(-1, 1)]
      }))
      : this.setState({ showResults: true })
  }

  nextQuestionCorrect = () => {
    this.setState({ correctAnswers: this.correctAnswers + 1 })
    this.nextQuestion()
  }

  resetData = () => {
    this.setState({
      questionsLeft: this.state.questions,
      showAnswer: false,
      showResults: false,
      correctAnswers: 0
    })
  }

  startAgain = () => {
    this.resetData()
    this.props.navigation.goBack()
  }

  toggleAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  render () {
    console.log('quiz props', this.props)
    console.log('quiz STATE', this.state)
    const deck = this.props.navigation.getParam('deck')
    console.log('deck for quiz', deck)

    const {
      questions,
      questionsLeft,
      showAnswer,
      showResults,
      correctAnswers
    } = this.state

    if (this.state.questionsLeft.length === 0) {
      return (
        <Text style={sharedStyles.container}>
        loading...
        </Text>
      )
    }
    if (showResults) {
      return (
        <View style={sharedStyles.container}>

          <Text style={styles.completed}>
        Quiz completed!
          </Text>
          <Text styles={styles.results}>
        You got {correctAnswers} correct answers out of {questions.length}.
          </Text>

          <View style={sharedStyles.buttonsContainer}>

            <TouchableOpacity
              style={sharedStyles.button}
              onPress={this.startAgain}
            >
              <Text style={sharedStyles.buttonText}>
                Start Again
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      )
    }

    return (
      <View style={sharedStyles.container}>

        <Text style={styles.counter}>
       Question {questions.length - questionsLeft.length + 1} of {questions.length}
        </Text>

        <View style={styles.card}>

          <Text style={styles.cardText}>
            {!showAnswer
              ? questionsLeft[0].question
              : questionsLeft[0].answer
            }
          </Text>

        </View>

        <TouchableOpacity
          style={styles.flipCard}
          onPress={this.toggleAnswer}
        >
          <Text style={styles.flipCardText}>
            {!showAnswer
              ? 'answer'
              : 'question'
            } ↺
          </Text>
        </TouchableOpacity>

        <View style={sharedStyles.buttonsContainer}>

          <TouchableOpacity
            style={sharedStyles.button}
            onPress={this.nextQuestionCorrect}
          >
            <Text style={sharedStyles.buttonText}>
          CORRECT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={sharedStyles.button}
            onPress={this.nextQuestion}
          >
            <Text style={sharedStyles.buttonText}>
          INCORRECT
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  }
}

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: 'darkblue',
    borderWidth: 5,
    borderColor: '#ba8c28',
    padding: 10,
    width: 250,
    height: 200
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    alignItems: 'center'
  },
  flipCard: {
    marginTop: 30
  },
  flipCardText: {
    color: '#ba8c28',
    fontSize: 16
  },
  counter: {
    fontSize: 16

  }
})
