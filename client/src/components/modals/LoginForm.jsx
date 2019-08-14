import React, { Component, Fragment } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class LoginForm extends Component {
  render() {
    return (
      <Fragment>
        <Form>
	        <FormGroup>
	          <Label for="email">Email</Label>
	          <Input type="email" name="email" placeholder="Email" bsSize="sm" />
	        </FormGroup>
	        <FormGroup>
	          <Label for="password">Password</Label>
	          <Input type="password" name="password" placeholder="Password" bsSize="sm" />
	        </FormGroup>
	        <Button type="submit" color="primary" block size="sm">Login</Button>
        </Form>
      </Fragment>
    );
  }
}
