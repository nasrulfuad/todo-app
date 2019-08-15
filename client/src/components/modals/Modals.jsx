import React, { Component, Fragment } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default class Modals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle = () => this.setState(prevState => ({ modal: !prevState.modal }))

  render = () =>
    (
      <Fragment>
        <NavLink onClick={this.toggle} href="#">{this.props.type}</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.type}</ModalHeader>
          <ModalBody>
            { this.props.type === 'Login' ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            ) }
          </ModalBody>
        </Modal>
      </Fragment>
    )
}
