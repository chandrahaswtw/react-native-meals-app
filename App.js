import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MealsNavigator from "./Navigator/mealsNavigator";
import { enableScreens } from 'react-native-screens';

// REDUX IMPORTS
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import MealReducer from './Store/MealReducer';

// COMBINE REDUCERS
const rootReducer = combineReducers ({
  MealState : MealReducer
})

// CREATING CENTRAL STORE
const store = createStore(rootReducer);

enableScreens();

export default function App() {

  const [isLoading, setLoading] = useState(true);

  const fetchFonts = () => {
    return Font.loadAsync({
      open_sans: require('./assets/Fonts/Open_Sans/OpenSans-Regular.ttf'),
      open_sans_semi_bold: require('./assets/Fonts/Open_Sans/OpenSans-SemiBold.ttf'),
      open_sans_extra_bold: require('./assets/Fonts/Open_Sans/OpenSans-ExtraBold.ttf'),
      pacifico: require('./assets/Fonts/Pacifico/Pacifico-Regular.ttf'),
      roboto_regular : require('./assets/Fonts/Roboto/Roboto-Regular.ttf')
    })
  }

  if (isLoading) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setLoading(false) }} onError={() => {
      console.log("Error")
    }}></AppLoading>
  }

  return (
     <Provider store= {store}><MealsNavigator></MealsNavigator></Provider>  
  );
}

const styles = StyleSheet.create({
});
