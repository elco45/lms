import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Button, Modal } from 'mdbreact';
import Form from 'react-jsonschema-form';
import leftSideModalItems from './leftSideModalItems';

const ModalLeftContainer = Styled.div`
  background: #B2D2F8;
  color: #fff;
  padding: 24px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ModalLeftTitle = Styled.p`
  color: #3F2272;
  font-weight: bold;
  font-size: 18px;
  margin-top: 56px;
  margin-bottom: 24px;
`;

const ModalLeftDescription = Styled.p`
  color: #3F2272;
  font-size: 14px;
  margin-left: 8px;
  margin-right: 8px;
`;

const Card = Styled.div`
  margin-top: 8px;
`;

const ImageContainer = Styled.img`
  max-width: 48px;
  max-height: 40px;
  margin-bottom: 8px;
`;

const ModalRightContainer = Styled.div`
  padding: 24px;
`;

const ModalRightTitle = Styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #1F3078;
`;

const ModalRightDescription = Styled.p`
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

const ModalTextTerms = Styled.span`
  font-size: 9px;
  color: gray;
`;

const signUpSchema = {
  type: 'object',
  required: ['email', 'username', 'password'],
  properties: {
    email: {
      type: 'string',
      minLength: 3,
      pattern: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      messages: {
        pattern: 'Correo inválido! Ej) test@academy.com',
        required: 'Correo no puede estar vacío',
        minLength: 'Correo debe tener por lo menos 3 caracteres!',
      },
    },
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
    pass2: {
      type: 'string',
      minLength: 6,
      messages: {
        minLength: 'Contraseña debe tener por lo menos 6 caracteres!',
      },
    },
  },
};

const uiSignUpSchema = {
  email: {
    'ui:widget': 'email',
    'ui:options': {
      label: false,
    },
    'ui:placeholder': 'Correo Electrónico',
  },
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
  pass2: {
    'ui:widget': 'password',
    'ui:options': {
      label: false,
    },
    'ui:placeholder': 'Repita Contraseña',
  },
};

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      live: false,
    };

    this.submitSignUp = this.submitSignUp.bind(this);
    this.validateSignUp = this.validateSignUp.bind(this);
  }

  validateSignUp(formData, errors) {
    const { signUpError } = this.props;
    const { live } = this.state;
    if (formData.password !== formData.pass2) {
      errors.pass2.addError('Contraseña no es similar al anterior');
    }
    if (live && signUpError && signUpError.code === 'auth/email-already-in-use') {
      errors.email.addError('Este correo ya esta siendo utilizado');
    }
    if (live && signUpError && signUpError.code === 'auth/username-already-in-use') {
      errors.username.addError('Este usuario no esta disponible');
    }
    return errors;
  }

  transformErrors(errors) {
    return errors.map((error) => {
      const errorProperty = error.property.replace('.', '');
      const schemaProperty = signUpSchema.properties;
      if (schemaProperty[errorProperty] && schemaProperty[errorProperty].messages[error.name]) {
        return {
          ...error,
          message: schemaProperty[errorProperty].messages[error.name],
        };
      }
      return error;
    });
  }

  submitSignUp(data) {
    this.setState({ live: true });
    this.props.signUp(data.formData);
  }

  renderLeftSideCardItems() {
    return (
      <ModalLeftContainer className="col-md-5 text-center">
        <ModalLeftTitle>
          ¡Únete Hoy!
        </ModalLeftTitle>
        <div className="row">
          {
            leftSideModalItems && leftSideModalItems.map((element) => (
              <Card className="col-6" key={element.key}>
                <ImageContainer
                  src={element.image}
                  alt={element.imageAlt}
                />
                <ModalLeftDescription>
                  {element.message}
                </ModalLeftDescription>
              </Card>
            ))
          }
        </div>
      </ModalLeftContainer>
    );
  }

  render() {
    const { toggle, toggleSignUp, modalSignUp } = this.props;

    return (
      <Modal size="lg" isOpen={modalSignUp} toggle={toggleSignUp} className="roundedModal">
        <div className="container">
          <div className="row">
            {this.renderLeftSideCardItems()}
            <ModalRightContainer className="col-md-7 col-sm-12 text-center">
              <div className="row">
                <div className="col-12 text-right">
                  <button style={{ cursor: 'pointer' }} onClick={toggleSignUp}>X</button>
                </div>
                <ModalRightTitle className="col-12">Academy</ModalRightTitle>
                <ModalRightDescription className="col-12">
                  Aprende con los mejores profesionales y sé parte de la nueva generación de profesionales digitales
                </ModalRightDescription>
                <Form
                  className="col-12  mt-2 mb-1"
                  formData={this.state.formData}
                  onChange={({ formData }) => this.setState({ formData, live: false })}
                  onSubmit={this.submitSignUp}
                  schema={signUpSchema}
                  validate={this.validateSignUp}
                  uiSchema={uiSignUpSchema}
                  transformErrors={this.transformErrors}
                  showErrorList={false}
                  noHtml5Validate
                  liveValidate={this.state.live}
                >
                  <Button type="submit" color="primary">Registrarse</Button>
                </Form>
                {/* <SignInProvider signInWithProvider={signInWithProvider} /> */}
                <div className="col-12">
                  <div className="float-left">
                    <ModalTextIsMember> Ya eres Miembro? </ModalTextIsMember>
                    <ModalTextOpenSI onClick={toggle}> Inicia Sesión </ModalTextOpenSI>
                  </div>
                  <div className="float-right">
                    <ModalTextTerms> Al registrarse aceptas nuestros </ModalTextTerms>
                    <ModalTextOpenSI> Términos y Condiciones </ModalTextOpenSI>
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

SignUpModal.propTypes = {
  toggle: PropTypes.func,
  toggleSignUp: PropTypes.func,
  signUp: PropTypes.func,
  signUpError: PropTypes.object,
  modalSignUp: PropTypes.bool,
};

export default SignUpModal;
