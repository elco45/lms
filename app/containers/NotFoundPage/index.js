import React from 'react';
import { Row, Col, Fa, Container } from 'mdbreact';
import BootstrapLinkButton from '../../components/BootstrapLinkButton';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center gradient">
        <Container>
          <Row>
            <Col md="12" className="mb-4 white-text text-center">
              <h4 className="display-3 font-weight-bold mb-0 pt-md-5 deep-purple-text">
                Esta página no existe :(
              </h4>
              <BootstrapLinkButton outline color="primary" href="/">
                <Fa icon="home mr-1" />Regresar
              </BootstrapLinkButton>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
