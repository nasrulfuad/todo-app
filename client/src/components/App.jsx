import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Jumbotron, Container } from 'reactstrap'
import AppNavBar from './AppNavBar'

export default class App extends Component {
  render() {
    return (
      <Fragment>
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
