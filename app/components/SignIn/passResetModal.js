import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Form from 'react-jsonschema-form';
import { Button, Modal } from 'mdbreact';

const ModalRightContainer = Styled.div`
  padding: 24px;
`;

const ModalRightTitle = Styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #1F3078;
`;

const passResetSchema = {
  type: 'object',
  required: ['username'],
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      pattern: '^[a-zA-Z0-9]+$',
      messages: {
        pattern: 'Usuario solo se acepta valores alfanuméricos',
        required: 'Usuario no puede estar vacío',
        minLength: 'Usuario debe tener por lo menos 3 caracteres!',
      },
    },
  },
};

const uiSignInSchema = {
  username: {
    'ui:options': {
      label: false,
    },
    'ui:placeholder': 'Nombre de usuario',
  },
};

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      live: false,
    };

    this.submitPassReset = this.submitPassReset.bind(this);
    this.validateSignIn = this.validateSignIn.bind(this);
  }

  validateSignIn(formData, errors) {
    const { passResetError } = this.props;
    const { live } = this.state;
    if (live && passResetError && passResetError.code === 'auth/username-does-not-exist') {
      errors.username.addError('Este usuario no existe');
    }
    return errors;
  }

  transformErrors(errors) {
    return errors.map((error) => {
      const errorProperty = error.property.replace('.', '');
      const schemaProperty = passResetSchema.properties;
      if (schemaProperty[errorProperty] && schemaProperty[errorProperty].messages[error.name]) {
        return {
          ...error,
          message: schemaProperty[errorProperty].messages[error.name],
        };
      }
      return error;
    });
  }

  submitPassReset(data) {
    this.setState({ live: true });
    this.props.passReset(data.formData);
  }

  render() {
    const { togglePassReset, modalPassReset, loadingPassReset } = this.props;

    return (
      <Modal isOpen={modalPassReset} toggle={togglePassReset} className="roundedModal">
        <div className="container">
          <div className="row">
            <ModalRightContainer className="col-12 text-center">
              <div className="row">
                <div className="col-12 text-right">
                  <button style={{ cursor: 'pointer' }} onClick={togglePassReset}>X</button>
                </div>
                <ModalRightTitle className="col-12">Contraseña Olvidado</ModalRightTitle>
                <Form
                  className="col-12  mt-2 mb-1"
                  formData={this.state.formData}
                  onChange={({ formData }) => this.setState({ formData, live: false })}
                  onSubmit={this.submitPassReset}
                  schema={passResetSchema}
                  validate={this.validateSignIn}
                  uiSchema={uiSignInSchema}
                  transformErrors={this.transformErrors}
                  showErrorList={false}
                  noHtml5Validate
                  liveValidate={this.state.live}
                >
                  <Button type="submit" color="primary">
                    {
                      loadingPassReset ? (
                        <i key="spin" className="fa fa-spinner fa-spin"></i>
                      ) : (
                        'Enviar correo'
                      )
                    }
                  </Button>
                  <Button onClick={togglePassReset} color="danger">
                    Cerrar
                  </Button>
                </Form>
              </div>
            </ModalRightContainer>
          </div>
        </div>
      </Modal>
    );
  }
}

SignInModal.propTypes = {
  togglePassReset: PropTypes.func,
  passReset: PropTypes.func,
  passResetError: PropTypes.object,
  modalPassReset: PropTypes.bool,
  loadingPassReset: PropTypes.bool,
};

export default SignInModal;
