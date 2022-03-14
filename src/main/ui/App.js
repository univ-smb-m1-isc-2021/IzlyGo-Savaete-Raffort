import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TextInput, Button, Alert, Pressable, Picker, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {SocialIcon} from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListeScreen from "./app/screens/ListeScreen";
import ReductionScreen from "./app/screens/ReductionScreen";
import SettingScreen from "./app/screens/SettingScreen";
import MapScreen from "./app/screens/MapScreen";
import InscriptionScreen from "./app/screens/InscriptionScreen";

import MaTab from "./app/screens/MaTab";

const Stack = createNativeStackNavigator();


export default class App extends React.Component{

    render() {

        let retour;
        
        if(false){
            retour = <InscriptionScreen></InscriptionScreen>
        }else {
            retour = <MaTab></MaTab>
        }


        return (
            <View style={superStyle.view}>
                {retour}
            </View>
        );
    }


}

const superStyle = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%'
    }
})


/*export default function MyStack() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  return (
      <Button
          title="Go to Jane's profile"
          onPress={() =>
              navigation.navigate('Profile', { name: 'Jane' })
          }
      />
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};
*/

