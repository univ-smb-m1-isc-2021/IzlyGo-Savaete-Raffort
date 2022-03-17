import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, TouchableHighlight} from 'react-native';
import { Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from '@expo-google-fonts/dosis'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBell, faCircleCheck, faRankingStar, faArrowRightFromBracket, faAngleRight } from '@fortawesome/free-solid-svg-icons'


import SuccesScreen from "./Parametres/SuccesScreen";
import ProfilScreen from "./Parametres/ProfilScreen";
import NotificationScreen from "./Parametres/NotificationScreen";
import ClassementScreen from "./Parametres/ClassementScreen";

const Stack = createNativeStackNavigator();

export default function SettingScreen() {
    return (

        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Paramètres', headerShown: false }}
            />
            <Stack.Screen name="Profil" component={ProfilScreen} />
            <Stack.Screen name="Succès" component={SuccesScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Classement" component={ClassementScreen} />
        </Stack.Navigator>
    );
}

const HomeScreen = ({ navigation }) => {
    return (

        <SafeAreaView style={styles.view_globale}>

        <View style={styles.view_image}>
            <Image
                style={styles.image_profil}
                source={{uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQEOT59zyut71w/profile-displayphoto-shrink_200_200/0/1594911160362?e=1652918400&v=beta&t=-q3eVhslA4SEZ4LMaYtiKZPLX024YuhiLy-l90gbHrE'}}/>
            <Text style={styles.identite}>Adrien RAFFORT</Text>
            <Text style={styles.info_inscription}>Inscrit depuis le 12 février 2022</Text>

        </View>

        <View style={styles.un_parametre}>
            <FontAwesomeIcon icon={faUser}  color={"black"} size={ 20 }/>

            <TouchableHighlight  onPress={() => navigation.navigate('Profil')} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Profil</Text>
                </View>
            </TouchableHighlight>

            <View style={styles.view_chevron}>
                <FontAwesomeIcon icon={faAngleRight}  color={"black"} size={ 20 }/>
            </View>
        </View>

        <View style={styles.un_parametre}>
            <FontAwesomeIcon icon={faBell}  color={"black"} size={ 20 }/>

            <TouchableHighlight  onPress={() => navigation.navigate('Notification', { name: 'Jane' })} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Notifications</Text>
                </View>
            </TouchableHighlight>

            <View style={styles.view_chevron}>
                <FontAwesomeIcon icon={faAngleRight}  color={"black"} size={ 20 }/>
            </View>
        </View>

        <View style={styles.un_parametre}>
            <FontAwesomeIcon icon={faCircleCheck}  color={"black"} size={ 20 }/>

            <TouchableHighlight  onPress={() => navigation.navigate('Succès', { name: 'Jane' })} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Succès</Text>
                </View>
            </TouchableHighlight>

            <View style={styles.view_chevron}>
                <FontAwesomeIcon icon={faAngleRight}  color={"black"} size={ 20 }/>
            </View>
        </View>

            <View style={styles.un_parametre}>
                <FontAwesomeIcon icon={faRankingStar}  color={"black"} size={ 20 }/>

                <TouchableHighlight  onPress={() => navigation.navigate('Classement', { name: 'Jane' })} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Classement</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.view_chevron}>
                    <FontAwesomeIcon icon={faAngleRight}  color={"black"} size={ 20 }/>
                </View>
            </View>


            <View style={styles.un_parametre}>
                <FontAwesomeIcon icon={faArrowRightFromBracket}  color={"black"} size={ 20 }/>

                <TouchableHighlight onPress={removeItemValue} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Déconnexion</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.view_chevron}>
                    <FontAwesomeIcon icon={faAngleRight}  color={"black"} size={ 20 }/>
                </View>

            </View>



    </SafeAreaView>
    );
};



const removeItemValue = async () => {

    try {
        await AsyncStorage.removeItem('@numero_etudiant');
        NativeModules.DevSettings.reload();
    }
    catch(exception) {
    }
}


const styles = StyleSheet.create({

    view_globale : {
        backgroundColor: "white",
        height: "100%",
        width: "100%"
    },

    image_profil: {
        height: 100,
        width: 100,
        borderRadius: 50,

    },

    view_image: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50
    },

    identite: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 20
    },

    info_inscription: {
        fontStyle: "italic"
    },

    affichage: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    un_parametre: {
        marginLeft: 50,
        marginRight: 50,
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#EEEEEE",
        flexDirection: "row",

    },

    titre_parametre: {
        textAlign: "center",
        paddingBottom: 10,
        fontWeight: "bold"
    },

    buttonText : {
        marginLeft: 20,
        fontSize: 20,
        color: "#5D5C5D",
    },


    view_chevron: {
        width: "10%",
        position: "absolute",
        top: 25,
        right: 0
    },

    une : {
        padding: 5,
        width: "25%",
        margin: 5,
        borderRadius: 10,
    },

    nom : {
        color: "white",
        textAlign: "center"
    }
})


const couleur = StyleSheet.create({
    red : {
        backgroundColor: "#E76967",
    },
    blue : {
        backgroundColor: "#82C5F1",
    },
    green : {
        backgroundColor: "#63D7B9",
    },
    purple : {
        backgroundColor: "#B689E7",
    },
    black : {
        backgroundColor: "#373F4A",
    },
    yellow : {
        backgroundColor: "#EAAE7B",
    }
})
