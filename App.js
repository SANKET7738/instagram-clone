import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import * as firebase from 'firebase';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC61VX9JYNBiFO5iGJOfhIP422FrTt1mQc",
  authDomain: "instagram-clone-6b67a.firebaseapp.com",
  projectId: "instagram-clone-6b67a",
  storageBucket: "instagram-clone-6b67a.appspot.com",
  messagingSenderId: "557521636138",
  appId: "1:557521636138:web:0947d521c3662a853fec53",
  measurementId: "G-WGB2HPF1J2"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main'
import AddScreen from  './components/main/Add'

const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state
    if(!loaded) {
      return(
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
              <Stack.Screen name="Register" component={RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store = {store} >
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}}/>
              <Stack.Screen name="Add" component={AddScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
 
  }
}

export default App
