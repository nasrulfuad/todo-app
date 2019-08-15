import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal, 
  ModalBody,
  ModalFooter,
  Button
  } from 'reactstrap'
import Modals from './modals/Modals'

export default class AppNavbar extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal = () => this.setState(prevState => ({ modal: !prevState.modal }))

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render = () =>
    (
      <Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Todo App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/nasrulfuad" target="_blank">GitHub</NavLink>
              </NavItem>
              {
                !this.props.isAuthenticated ? (
                  <Fragment>
                    <NavItem>
                      <Modals type="Login" />
                    </NavItem>
                    <NavItem>
                      <Modals type="Register" />
                    </NavItem>
                  </Fragment>
                ) : (
                <Fragment>
                  <NavItem>
                    <NavLink href="#" onClick={this.toggleModal}>Logout</NavLink>
                  </NavItem>
                  <Modal isOpen={this.state.modal} toggle={this.toggleModal} fade={false} className={this.props.className}>
                    <ModalBody>
                      <h4 className="m-0 text-secondary">Anda ingin keluar?</h4>
                    </ModalBody>
                    <ModalFooter className="py-2">
                      <Button size="sm" className="w-25" color="primary">Iya</Button>
                      <Button size="sm" className="w-25" color="secondary" onClick={this.toggleModal}>Tidak</Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
                )
              }
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    )
}
