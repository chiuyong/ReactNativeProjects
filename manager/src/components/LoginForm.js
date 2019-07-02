import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../store/actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    //Event Handler que passa o email atraves de uma action para todos os reducers.
    //Sendo que o AuthReducer q vai atender pq nele tem um case que captura esta action
    //atualiza state e salva state
    this.props.emailChanged(text);
    //retorne o novo state
    //que vai ser feito pelo mapStateToProps
  }

  onPasswordChange(password) {
    //Event Handler que passa o password 
    //atraves de uma action (index.js da action) para todos os reducers.
    //Sendo que o AuthReducer q vai atender pq nele tem um case que captura esta action
    //atualiza state e salva state
    this.props.passwordChanged(password);
    //retorne o novo state
    //que vai ser feito pelo mapStateToProps
  }

  onButtonPress() {
    const { email, password } = this.props;
    
    //chame o loginUser method
    this.props.loginUser({ email, password });
  }

  //Se tiver erro
  renderError() {
    //'' == false
    //So an empty string is equal to false and a non empty string is true
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email"
            placeholder="email@email.com"
            //bind this porque eh uma callback function
            //precisa passar o contexto como argumento (a string q ele ta digitando)
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
          
        <CardSection>
          <Input 
            secureTextEntry
            label="Password"
            placeholder="******"
            //bind this porque eh uma callback function
            //precisa passar o contexto como argumento (a string q ele ta digitando)
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        {this.renderError()}
        <CardSection>
          {this.renderButton()}          
        </CardSection>
      </Card>
    );
  }
}

//retorne o state do AuthReducer através da key 'auth' como props (objeto) para este componente
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

//css
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

//connect to Redux (Actions, reducers e store)
//Acesse a action emailChanged do Redux pelo LoginForm 
//LoginForm recebe emailChanged como this.props
//mapStateToProps para acessar o redux e receber novo state
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);

