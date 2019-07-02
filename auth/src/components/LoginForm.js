import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  //authenticate
  onButtonPress() {
    const { email, password } = this.state;
    
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucess.bind(this))
          .catch(this.onLoginVerifyPassword.bind(this));
      });
  }

  //Caso Falhar na autenticação
  onLoginFail() {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

  //Firebase soh permite logar com no min 6 digitos
  onLoginFailShortPassword() {
    this.setState({ error: 'Must enter at least 6 digits.', loading: false });
  }

  //Verificar Senha
  onLoginVerifyPassword() {
    if (this.state.password.length < 6) {
      return this.onLoginFailShortPassword();
    }
    return this.onLoginFail();
  }

  onLoginSucess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  //Caso o user logar, mostrar o spinner
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() { //salvar texto do usuario, //securityTextEntry no email eh Undefined == false
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}  
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="*******"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}  
          />
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
