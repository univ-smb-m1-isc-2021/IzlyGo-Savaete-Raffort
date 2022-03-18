import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InscriptionScreen from "./InscriptionScreen";
import {Text, TouchableHighlight, View} from "react-native";
import React from "react";
import ConnexionScreen from "./ConnexionScreen";

const Stack = createNativeStackNavigator();

export default function AccueilScreen() {
    return (
        /*<Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Accueil', headerShown: false }}
            />
            <Stack.Screen name="Connexion" component={ConnexionScreen} />
            <Stack.Screen name="Inscription" component={InscriptionScreen} />
        </Stack.Navigator>*/

        <ConnexionScreen></ConnexionScreen>
    );
}


const HomeScreen = ({ navigation }) => {
    return (
        <View>

            <TouchableHighlight  onPress={() => navigation.navigate('Connexion')} underlayColor="white">
                <View>
                    <Text>Connexion</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight  onPress={() => navigation.navigate('Inscription' )} underlayColor="white">
                <View>
                    <Text>Créer un compte</Text>
                </View>
            </TouchableHighlight>
        </View>

    )
}