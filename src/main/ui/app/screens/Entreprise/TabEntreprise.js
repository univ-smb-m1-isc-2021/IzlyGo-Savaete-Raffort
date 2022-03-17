import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfilEntrepriseScreen from "./ProfilEntrepriseScreen";
import ReductionEntrepriseScreen from "./ReductionEntrepriseScreen";
import ObjetEntrepriseScreen from "./ObjetEntrepriseScreen";

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";



export default class TabEntreprise extends React.Component {
    render() {
        return(
            <NavigationContainer>
                <Tab.Navigator

                    activeColor="#ff0071"
                    inactiveColor="#FFF"
                    barStyle={{backgroundColor: '#fff'}}
                    screenOptions={({route, navigation}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            if (route.name === 'Profil') {
                                iconName = focused ? 'home' : 'home';
                            } else if (route.name === 'Mes réductions') {
                                iconName = focused ? 'list' : 'list';
                            } else if (route.name === 'Mes objets') {
                                iconName = focused ? 'print' : 'print';
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}>
                    <Tab.Screen name="Profil" component={ProfilEntrepriseScreen} />
                    <Tab.Screen name="Mes réductions" component={ReductionEntrepriseScreen} />
                    <Tab.Screen name="Mes objets" component={ObjetEntrepriseScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
const Tab = createBottomTabNavigator();
