import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Button, Form, Alert, FormGroup, Label, Input } from 'reactstrap'
import Loader from '../Loader'

export default class LoginForm extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		email: '',
  		password: '',
  		error: '',
  		success: '',
      isLoading: false
  	}
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  onSubmit = async e => {
    e.preventDefault()
  	const { email, password } = this.state

  	if(email === '' || password === '') return this.setState({ error: 'Isi semua kolom akhi' })

    this.setState({isLoading: true})
  	axios.post('/api/auth', { email, password })
  		.then(result => {
  			this.setState({error: '', success: result.data.msg})
  			setTimeout(() => this.props.toggle('dashboard', result.data.token), 3500)
  		})
  		.catch(err => {
        this.setState({error: err.response.data.msg})
        setTimeout(() => this.setState({isLoading: false}), 3500)
      })
    }

  render() {
    return (
      <Fragment>
      {
        this.state.isLoading ? <Loader /> : '' 
      }
      { this.state.error !== '' ? (
	      <Alert color="danger">
	      	{ this.state.error }
	      </Alert>
      ) : '' }
      { this.state.success !== '' ? (
	      <Alert color="success">
	      	{ this.state.success }
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
