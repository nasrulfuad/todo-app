import React, { Component, Fragment } from 'react'
import { Button, Form, Alert, FormGroup, Label, Input } from 'reactstrap'

export default class LoginForm extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		email: '',
  		password: '',
  		error: ''
  	}
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  onSubmit = async e => {
    e.preventDefault()
  	const { email, password } = this.state

  	if(email === '' || password === '') return this.setState({ error: 'Isi semua kolom akhi' })
    document.getElementById('ipl-progress-indicator').classList.remove('available')
    setTimeout(() => document.getElementById('ipl-progress-indicator').classList.add('available'), 2000)
    }

  render() {
    return (
      <Fragment>
      { this.state.error !== '' ? (
	      <Alert color="danger">
	      	{ this.state.error }
	      </Alert>
      ) : '' }
        <Form onSubmit={this.onSubmit}>
	        <FormGroup>
	          <Label for="email">Email</Label>
	          <Input type="email" name="email" placeholder="Email" bsSize="sm" onChange={this.onChange} />
	        </FormGroup>
	        <FormGroup>
	          <Label for="password">Password</Label>
	          <Input type="password" name="password" placeholder="Password" bsSize="sm" onChange={this.onChange} />
	        </FormGroup>
	        <Button type="submit" color="primary" block size="sm">Login</Button>
        </Form>
      </Fragment>
    );
  }
}
