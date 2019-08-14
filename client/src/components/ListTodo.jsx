import React, { Component, Fragment } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class ListTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
      }
  }
  componentDidMount() {
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'x-auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTJkMDJhYTMwN2RkMmY5OTk1OWNhNyIsImlhdCI6MTU2NTc1MjE5NywiZXhwIjoxNTY1NzU1Nzk3fQ.HoraeWQTlIsZXL67g3u89dYnEI6998ozYh2ivhhoTwY'
      }
    }

    axios.get('/api/todos', config)
      .then(res => this.setState({ todos: res.data }))
  }
  render() {
    const { todos } = this.state
    return (
      <Fragment>
      {
        todos.map((todo, i) => <p key={i}>{todo.name}</p>)
      }
      </Fragment>
    )
  }
}
