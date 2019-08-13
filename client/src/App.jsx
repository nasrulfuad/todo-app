import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'reactstrap'
import './App.css'

export default class App extends Component {
  componentDidMount() {
    console.log('Ok')
  }
  render() {
    return (
      <Container>
        Hello
      </Container>
    )
  }
}
