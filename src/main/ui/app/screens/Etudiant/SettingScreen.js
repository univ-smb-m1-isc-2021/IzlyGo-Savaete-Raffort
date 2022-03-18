import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, TouchableHighlight} from 'react-native';
import { Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from '@expo-google-fonts/dosis'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBell, faCircleCheck, faRankingStar, faArrowRightFromBracket, faAngleRight, faHandshakeSimple } from '@fortawesome/free-solid-svg-icons'


import SuccesScreen from "./Parametres/SuccesScreen";
import ProfilScreen from "./Parametres/ProfilScreen";
import NotificationScreen from "./Parametres/NotificationScreen";
import ClassementScreen from "./Parametres/ClassementScreen";
import ParrainageScreen from "./Parametres/ParrainageScreen";
import React, {useEffect, useState} from "react";
import ConnexionScreen from "./ConnexionScreen";
import TabEtudiant from "./TabEtudiant";

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
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="Classement" component={ClassementScreen} />
            <Stack.Screen name="Parrainage" component={ParrainageScreen} />
        </Stack.Navigator>
    );
}





const HomeScreen = ({ navigation }) => {


    const [numero, setNumero] = useState(null);
    const [etudiant, setEtudiant] = useState({});

    const donneEtudiant = async () => {
        try {
            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')
            setNumero(numero_etudiant)

            const response = await fetch('http://localhost:8080/api/profil/' + numero_etudiant);
            const json = await response.json();

            setEtudiant(json);
            setNumero(value)

        } catch(e) {
            // error reading value
        }
    }


    const liste_choix = [
        {icon : faUser, nom : "Profil"},
        {icon : faBell, nom : "Notifications"},
        {icon : faCircleCheck, nom : "Succès"},
        {icon : faRankingStar, nom : "Classement"},
        {icon : faHandshakeSimple, nom : "Parrainage"}
    ]


    useEffect(() => {
        donneEtudiant()

    }, [numero])

    return (

        <SafeAreaView style={styles.view_globale}>

        <View style={styles.view_image}>
            <Image
                style={styles.image_profil}
                source={{uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQEOT59zyut71w/profile-displayphoto-shrink_200_200/0/1594911160362?e=1652918400&v=beta&t=-q3eVhslA4SEZ4LMaYtiKZPLX024YuhiLy-l90gbHrE'}}/>
            <Text style={styles.identite}>{ etudiant.prenom } { etudiant.nom }</Text>
            <Text style={styles.info_inscription}>Inscrit depuis le { etudiant.date_inscription }</Text>

        </View>

            {
                liste_choix.map((choix) => {
                    return(
                        <View style={styles.un_parametre}>
                            <FontAwesomeIcon icon={choix.icon}  color={"black"} size={ 20 }/>

                            <TouchableHighlight  onPress={() => navigation.navigate(choix.nom)} underlayColor="white">
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>{choix.nom}</Text>
                                </View>
                            </TouchableHighlight>

                            <View style={styles.view_chevron}>
                                <FontAwesomeIcon icon={faAngleRight}  color={"black"} size={ 20 }/>
                            </View>
                        </View>
                    )
                })
            }



            <View style={styles.un_parametre}>
                <FontAwesomeIcon icon={faArrowRightFromBracket}  color={"black"} size={ 20 }/>

                <TouchableHighlight onPress={() => removeItemValue} underlayColor="white">
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
