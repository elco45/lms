import React from 'react';
import { Row, Col, Fa, Button, Container } from 'mdbreact';

export class UserVerifyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center gradient">
        <Container>
          <Row>
            <Col md="12" className="mb-4 white-text text-center">
              <h3 className="display-3 font-weight-bold mb-0 pt-md-5 deep-purple-text">Whoops!</h3>
              <hr className="hr-dark my-4 w-75" />
              <h4 className="subtext-header mt-2 mb-4 deep-purple-text">
                Porfavor entre a su cuenta para poder avanzar a esa página.
              </h4>
              <Button outline color="primary" href="/"><Fa icon="home mr-1" />Regresar</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserVerifyPage;
