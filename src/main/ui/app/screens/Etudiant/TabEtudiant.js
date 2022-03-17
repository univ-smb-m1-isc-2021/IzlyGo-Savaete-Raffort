import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapScreen from "./MapScreen";
import ListeScreen from "./ListeScreen";
import ReductionScreen from "./ReductionScreen";
import SettingScreen from "./SettingScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";



export default class TabEtudiant extends React.Component {
    render() {
        return(
            <NavigationContainer>
                <Tab.Navigator


                    activeColor="#AAAAAA"
                    inactiveColor="#FFF"
                    barStyle={{backgroundColor: '#fff'}}
                    screenOptions={({route, navigation}) => ({
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
                    <Tab.Screen name="Carte" component={MapScreen} options={{headerShown: false}} />
                    <Tab.Screen name="Ma liste" component={ListeScreen} options={{headerShown: false}}/>
                    <Tab.Screen name="Bon plan" component={ReductionScreen} options={{headerShown: false}}/>
                    <Tab.Screen name="Paramètres" component={SettingScreen} options={{headerShown: false}}/>
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
const Tab = createBottomTabNavigator();
