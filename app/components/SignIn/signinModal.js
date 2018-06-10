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

const ModalTextIsMember = Styled.span`
  font-size: 11px;
  color: gray;
`;

const ModalTextOpenSI = Styled.a`
  font-size: 10px;
  color: #69ABB7 !important;
`;

const signInSchema = {
  type: 'object',
  required: ['username', 'password'],
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
    password: {
      type: 'string',
      minLength: 6,
      messages: {
        required: 'Contraseña no puede estar vacío',
        minLength: 'Contraseña debe tener por lo menos 6 caracteres!',
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
  password: {
    'ui:widget': 'password',
    'ui:options': {
      label: false,
    },
    'ui:placeholder': 'Contraseña',
  },
};

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      live: false,
    };

    this.submitSignIn = this.submitSignIn.bind(this);
    this.validateSignIn = this.validateSignIn.bind(this);
    this.toggleLiveSignIn = this.toggleLiveSignIn.bind(this);
    this.toggleLivePass = this.toggleLivePass.bind(this);
    this.toggleLiveSignUp = this.toggleLiveSignUp.bind(this);
  }

  validateSignIn(formData, errors) {
    const { signInError } = this.props;
    const { live } = this.state;
    if (live && signInError && signInError.code === 'auth/username-does-not-exist') {
      errors.password.addError('Usuario o contraseña inválido.');
    }
    if (live && signInError && signInError.code === 'auth/wrong-password') {
      errors.password.addError('Usuario o contraseña inválido');
    }
    return errors;
  }

  transformErrors(errors) {
    return errors.map((error) => {
      const errorProperty = error.property.replace('.', '');
      const schemaProperty = signInSchema.properties;
      if (schemaProperty[errorProperty] && schemaProperty[errorProperty].messages[error.name]) {
        return {
          ...error,
          message: schemaProperty[errorProperty].messages[error.name],
        };
      }
      return error;
    });
  }

  submitSignIn(data) {
    this.setState({ live: true });
    this.props.signIn(data.formData);
  }

  toggleLiveSignIn() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.toggleSignIn();
  }

  toggleLiveSignUp() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.toggle();
  }

  toggleLivePass() {
    this.setState({
      live: false,
      formData: {},
    });
    this.props.togglePassReset();
  }

  render() {
    const { modalSignIn, loading } = this.props;

    return (
      <Modal isOpen={modalSignIn} toggle={this.toggleLiveSignIn} className="roundedModal">
        <div className="container">
          <div className="row">
            <ModalRightContainer className="col-12 text-center">
              <div className="row">
                <div className="col-12 text-right">
                  <button style={{ cursor: 'pointer' }} onClick={this.toggleLiveSignIn}>X</button>
                </div>
                <ModalRightTitle className="col-12">Iniciar Sesión</ModalRightTitle>
                <Form
                  className="col-12  mt-2 mb-1"
                  formData={this.state.formData}
                  onChange={({ formData }) => this.setState({ formData, live: false })}
                  onSubmit={this.submitSignIn}
                  schema={signInSchema}
                  validate={this.validateSignIn}
                  uiSchema={uiSignInSchema}
                  transformErrors={this.transformErrors}
                  showErrorList={false}
                  noHtml5Validate
                  liveValidate={this.state.live}
                >
                  <Button type="submit" color="primary">
                    {
                      loading ? (
                        <i key="spin" className="fa fa-spinner fa-spin"></i>
                      ) : (
                        'Entrar'
                      )
                    }
                  </Button>
                </Form>
                <div className="col-12">
                  <div className="float-left">
                    <ModalTextOpenSI onClick={this.toggleLivePass}> Se me olvidó la contraseña...</ModalTextOpenSI>
                  </div>
                  <div className="float-right">
                    <ModalTextIsMember> No eres miembro? </ModalTextIsMember>
                    <ModalTextOpenSI onClick={this.toggleLiveSignUp}> Crear cuenta </ModalTextOpenSI>
                  </div>
                </div>
              </div>
            </ModalRightContainer>
          </div>
        </div>
      </Modal>
    );
  }
}

SignInModal.propTypes = {
  toggle: PropTypes.func,
  togglePassReset: PropTypes.func,
  toggleSignIn: PropTypes.func,
  signIn: PropTypes.func,
  signInError: PropTypes.object,
  modalSignIn: PropTypes.bool,
  loading: PropTypes.bool,
};

export default SignInModal;
