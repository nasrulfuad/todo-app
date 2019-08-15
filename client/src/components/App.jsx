import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Jumbotron, Container } from 'reactstrap'
import '../css/App.css'
import AppNavBar from './AppNavBar'
import { Loader } from './Loader'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false
    }
  }

  onLoad = () => new Promise(resolve => setTimeout(resolve, 2000))

  componentDidMount = () => {
    this.onLoad().then(() => {
      document.getElementById('ipl-progress-indicator').classList.add('available')
    })
  }

  authenticate = tokenProp => {
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
      })
  }

  logOut = () => {
    document.getElementById('ipl-progress-indicator').classList.remove('available')
    setTimeout(() => {
      document.getElementById('ipl-progress-indicator').classList.add('available')
      this.setState({ isAuthenticated: false })
    }, 2500)
    localStorage.removeItem('token')
  }

  register = (name, email, password) => {
    axios.post('/api/users', { name, email, password })
      .then(result => {
        this.setState({error: '', success: result.data.msg})
        setTimeout(() => this.props.toggle(), 2500)
      })
      .catch(err => this.setState({error: err.response.data.msg}))
  }

  render = () =>
    (
      <Fragment>
        <Loader />
        <AppNavBar isAuthenticated={this.isAuthenticated} />
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Selamat Datang</h1>
            <p className="lead">Silahkan login, jika masih belum punya akun silahkan registrasi terlebih dahulu</p>
          </Container>
        </Jumbotron>
      </Fragment>
    )
}
