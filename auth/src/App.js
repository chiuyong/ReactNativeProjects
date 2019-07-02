import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCNy_wHkT_K0AS19HBQZYHQz-iYqv7HrKQ',
      authDomain: 'authentication-198e0.firebaseapp.com',
      databaseURL: 'https://authentication-198e0.firebaseio.com',
      projectId: 'authentication-198e0',
      storageBucket: 'authentication-198e0.appspot.com',
      messagingSenderId: '468990561460',
      appId: '1:468990561460:web:f68df519f496448c'
    });
    //if user signout == undefined or null
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View 
          style={{ 
            alignSelf: 'center'
          }}
          >
            <Spinner size="large" />
          </View>
        ); 
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
