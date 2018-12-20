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
    questionsLeft: [],
    totalQuestions: 0,
    showAnswer: false,
    showResults: false,
    correctAnswers: 0
  }

  componentDidMount () {
    const deck = this.props.navigation.getParam('deck')
    const { title, questions } = deck
    this.setState({ title, questionsLeft: questions, totalQuestions: questions.length })
    console.log('questions', questions)
  }

  correctCardFace = () => {
    this.state.showAnswer && this.setState({ showAnswer: false })
  }

  nextQuestion = () => {
    if (this.state.questionsLeft.length === 1) {
      return this.setState({ showResults: true })
    }

    this.correctCardFace()

    const newQuestionsLeft = [...this.state.questionsLeft]
    newQuestionsLeft.splice(0, 1)
    this.setState({ questionsLeft: newQuestionsLeft })
  }

  nextQuestionCorrect = () => {
    this.setState(prevState => ({
      correctAnswers: prevState.correctAnswers + 1
    }))
    this.nextQuestion()
  }

  resetData = () => {
    this.setState({
      questionsLeft: this.props.navigation.getParam('deck').questions,
      showAnswer: false,
      showResults: false,
      correctAnswers: 0
    })
  }

  startAgain = () => {
    this.resetData()
  }

  toggleAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  render () {
    console.log('quiz STATE', this.state)

    const {
      totalQuestions,
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

          <Text style={styles.results}>
        Quiz completed!
          </Text>
          {console.log('correct', correctAnswers)}
          <Text style={styles.results}>
        You got {correctAnswers} correct answers out of {totalQuestions}.
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
       Question {totalQuestions - questionsLeft.length + 1} of {totalQuestions}
        </Text>

        <View style={[styles.card, { backgroundColor: showAnswer ? 'white' : 'darkblue' }]}>

          <Text style={[styles.cardText, { color: !showAnswer ? 'white' : 'darkblue' }]}>
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
    borderWidth: 5,
    borderColor: '#ba8c28',
    padding: 10,
    width: 250,
    height: 200
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center'
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
  },
  results: {
    fontSize: 20,
    marginTop: 30
  }
})
