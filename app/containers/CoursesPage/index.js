import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Fa, Container } from 'mdbreact';
import PageContainer from '../../components/PageContainer';
import BootstrapLinkButton from '../../components/BootstrapLinkButton';

export class CoursesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PageContainer verifyUser>
        <div
          style={{ height: '100vh' }}
          className="d-flex justify-content-center align-items-center gradient"
        >
          <Container>
            <Row>
              <Col md="12" className="mb-4 white-text text-center">
                <h3 className="display-3 font-weight-bold mb-0 pt-md-5 deep-purple-text">Cursos!</h3>
                <BootstrapLinkButton outline color="primary" href="/">
                  <Fa icon="home mr-1" /> Regresar
                </BootstrapLinkButton>
              </Col>
            </Row>
          </Container>
        </div>
      </PageContainer>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(CoursesPage);
