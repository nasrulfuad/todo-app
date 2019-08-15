import React, { Component, Fragment } from 'react'
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

export default class RegisterForm extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		name: '',
  		email: '',
  		password: '',
  		password2: '',
  		error: '',
  		success: ''
  	}
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  onSubmit = e => {
    e.preventDefault()
  	const { name, email, password, password2 } = this.state
  	if(name === '' || email === '' || password === '' || password2 === '') return this.setState({ error: 'Isi semua kolom akhi' })
  	if(password !== password2) return this.setState({ error: 'Password tidak sama akhi' })
  }

  render = () =>
    (
      <Fragment>
      { this.state.error !== '' ? (
	      <Alert color="danger">
	      	{ this.state.error }
	      </Alert>
      ) : '' }
      {
      	this.state.success !== '' ? (
		      <Alert color="success">
		      	{ this.state.success }
		      </Alert>
	      ) : '' }
        <Form onSubmit={this.onSubmit}>
	        <FormGroup>
	          <Label for="name">Nama</Label>
	          <Input type="text" name="name" placeholder="Nama" bsSize="sm" onChange={this.onChange} autoFocus/>
	        </FormGroup>
	        <FormGroup>
	          <Label for="email">Email</Label>
	          <Input type="email" name="email" placeholder="Email" bsSize="sm" onChange={this.onChange} />
	        </FormGroup>
	        <FormGroup>
	          <Label for="password">Password</Label>
	          <Input type="password" name="password" placeholder="Password" bsSize="sm" onChange={this.onChange} />
	        </FormGroup>
	        <FormGroup>
	          <Label for="password2">Confirm Password</Label>
	          <Input type="password" name="password2" placeholder="Confirm Password" bsSize="sm" onChange={this.onChange} />
	        </FormGroup>
	        <Button type="submit" color="primary" block size="sm">Register</Button>
        </Form>
      </Fragment>
    )
}
