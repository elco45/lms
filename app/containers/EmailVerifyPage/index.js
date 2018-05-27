import React from 'react';
import { Row, Col, Fa, Container } from 'mdbreact';
import BootstrapLinkButton from '../../components/BootstrapLinkButton';

export class EmailVerifyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center gradient">
        <Container>
          <Row>
            <Col md="12" className="mb-4 white-text text-center">
              <h3 className="display-3 font-weight-bold mb-0 pt-md-5 deep-purple-text">Whoops!</h3>
              <hr className="hr-dark my-4 w-75" />
              <h4 className="subtext-header mt-2 mb-4 deep-purple-text">
                Porfavor verifique su correo para poder proseguir a esta página.
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

export default EmailVerifyPage;
