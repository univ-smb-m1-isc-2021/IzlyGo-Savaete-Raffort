import {StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapScreen from "./MapScreen";
import ListeScreen from "./ListeScreen";
import ReductionScreen from "./ReductionScreen";
import SettingScreen from "./SettingScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";



export default class MaTab extends React.Component {
    render() {
        return(
            <NavigationContainer>
                <Tab.Navigator

                    activeColor="#ff0071"
                    inactiveColor="#FFF"
                    barStyle={{backgroundColor: '#fff'}}
                    screenOptions={({route, navigation}) => ({
                        tabBarLabel: navigation.isFocused() ? route.name : '',
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            if (route.name === 'Carte') {
                                iconName = focused ? 'home' : 'home';
                            } else if (route.name === 'Ma liste') {
                                iconName = focused ? 'list' : 'list';
                            } else if (route.name === 'Bon plan') {
                                iconName = focused ? 'print' : 'print';
                            } else if (route.name === 'Paramètres') {
                                iconName = focused ? 'cog' : 'cog';
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}>
                    <Tab.Screen name="Carte" component={MapScreen} />
                    <Tab.Screen name="Ma liste" component={ListeScreen} />
                    <Tab.Screen name="Bon plan" component={ReductionScreen} />
                    <Tab.Screen name="Paramètres" component={SettingScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
const Tab = createBottomTabNavigator();
