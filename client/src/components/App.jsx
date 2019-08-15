import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Jumbotron, Container } from 'reactstrap'
import '../css/App.css'
import AppNavBar from './AppNavBar'
import Loader from './Loader'

export default class App extends Component {

  onLoad = () => new Promise(resolve => setTimeout(resolve, 2000))

  componentDidMount = () => {
    this.onLoad().then(() => {
      // fade out
      document.getElementById('ipl-progress-indicator').classList.add('available')
    })
  }

  render() {
    return (
      <Fragment>
        <Loader />
        <AppNavBar />
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Selamat Datang</h1>
            <p className="lead">Silahkan login, jika masih belum punya akun silahkan registrasi terlebih dahulu</p>
          </Container>
        </Jumbotron>
      </Fragment>
    )
  }
}
