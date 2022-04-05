import React, {useEffect, useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapScreen from "./MapScreen";
import ListeScreen from "./ListeScreen";
import ReductionScreen from "./ReductionScreen";
import SettingScreen from "./SettingScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {faBell, faCircleCheck, faHandshakeSimple, faRankingStar, faUser} from "@fortawesome/free-solid-svg-icons";



export default function TabEtudiant() {

    const [badge, setBadge] = useState(0);
    const [refresh, setRefresh] = useState(false);


    const miam = () => {
        setBadge(badge+1)
        //setRefresh(!refresh)
    }

    const resetBadge = () => {
        setBadge(0)
    }

    const donneBadge = async () => {
        try {
            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')
            const url = await AsyncStorage.getItem('@url')


            const response = await fetch(url + '/api/profil/' + numero_etudiant);
            const json = await response.json();

            setBadge(json.nombre_badge)

            await AsyncStorage.setItem('@badge_t1', '' + json.nombre_badge)


            console.log('json.nombre_badge')
            console.log(json.nombre_badge)

        } catch(e) {
            // error reading value
        }
    }


    useEffect(() => {
        donneBadge()

    }, [])

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
                    <Tab.Screen name="Carte" options={{headerShown: false}} >
                        {props => <MapScreen miam={miam} /> }
                    </Tab.Screen>
                    <Tab.Screen name="Ma liste" component={ListeScreen} options={{headerShown: false}}/>
                    <Tab.Screen name="Bon plan" component={ReductionScreen} options={{headerShown: false}}/>
                    <Tab.Screen name="Paramètres" options={{headerShown: false, tabBarBadge: badge > 0 ? badge : null }}>
                        {props => <SettingScreen hasBadge={badge > 0 ? true : false} resetBadge={resetBadge} /> }
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        )

}
const Tab = createBottomTabNavigator();
