import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
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
      isAuthenticated: false,
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.isAuthenticated()
  }

  isAuthenticated = tokenProp => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': token
      }
    }

    axios.get('/api/auth/user', config)
      .then(result => {
        if(result.data._id) this.setState({isAuthenticated: true})
      })
      .catch(err => {
        localStorage.removeItem('token')
        this.setState({
          isAuthenticated: false
        })
      })
  }

  logOut = () => {
    document.getElementById('ipl-progress-indicator').classList.remove('available')
    setTimeout(() => {
      document.getElementById('ipl-progress-indicator').classList.add('available')
      this.setState({ isAuthenticated: false, modal: false, isLoading: true})
    }, 2500)
    localStorage.removeItem('token')
  }

  render() {
    return (
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
                !this.state.isAuthenticated ? (
                  <Fragment>
                    <NavItem>
                      <Modals type="Login" isAuthenticated={this.isAuthenticated}/>
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
                      <Button size="sm" className="w-25" color="primary" onClick={this.logOut}>Iya</Button>
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
}
