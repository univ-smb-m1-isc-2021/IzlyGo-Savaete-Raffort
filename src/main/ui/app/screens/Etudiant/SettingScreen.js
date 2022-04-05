import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, TouchableHighlight, Alert} from 'react-native';
import { Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from '@expo-google-fonts/dosis'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faUser,
    faBell,
    faCircleCheck,
    faRankingStar,
    faArrowRightFromBracket,
    faAngleRight,
    faHandshakeSimple
} from '@fortawesome/free-solid-svg-icons'


import SuccesScreen from "./Parametres/SuccesScreen";
import ProfilScreen from "./Parametres/ProfilScreen";
import NotificationScreen from "./Parametres/NotificationScreen";
import ClassementScreen from "./Parametres/ClassementScreen";
import ParrainageScreen from "./Parametres/ParrainageScreen";
import React, {useEffect, useState} from "react";
import ConnexionScreen from "./ConnexionScreen";
import TabEtudiant from "./TabEtudiant";
import ImagePersonnage from "../../components/ImagePersonnage";
import * as Haptics from "expo-haptics";
import {useNavigation} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function SettingScreen(props) {

    const [badge, setBadge] = useState(false);

    const resetBadge2 = () => {
        props.resetBadge()
    }

    useEffect(() =>  {
        console.log("YA UN BADGE DANS SETTING ?")
        console.log(props.hasBadge)
        setBadge(props.hasBadge)

    }, [badge]);
    return (

        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                options={{ title: 'Paramètres', headerShown: false }}
            >
                {props => <HomeScreen hasBadge={badge} resetBadge={resetBadge2}/> }

            </Stack.Screen>
            <Stack.Screen name="Profil" component={ProfilScreen} />
            <Stack.Screen name="Succès" component={SuccesScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="Classement" component={ClassementScreen} />
            <Stack.Screen name="Parrainage" component={ParrainageScreen} />
        </Stack.Navigator>
    );
}





const HomeScreen = ({hasBadge, resetBadge}) => {

    const navigation = useNavigation();


    const [badge, setBagde] = useState(false);
    const [liste_choix, setListe] = useState([]);


    useEffect(() =>  {
        console.log("YA UN BADGE DANS HHOME ?")
        console.log(hasBadge)


        setBagde(hasBadge)

        setListe([
            {icon : faUser, nom : "Profil", tag: false, operate: true},
            {icon : faBell, nom : "Notifications", tag : false, operate: true},
            {icon : faCircleCheck, nom : "Succès", tag: badge, operate: true},
            {icon : faRankingStar, nom : "Classement", tag: false, operate: false},
            {icon : faHandshakeSimple, nom : "Parrainage", tag: false, operate: true}
        ])

    }, [hasBadge]);


    const [numero, setNumero] = useState(null);
    const [etudiant, setEtudiant] = useState({});


    const donneEtudiant = async () => {
        try {
            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')
            const url = await AsyncStorage.getItem('@url')

            setNumero(numero_etudiant)

            const response = await fetch(url + '/api/profil/' + numero_etudiant);
            const json = await response.json();

            setEtudiant(json);
            setNumero(value)

        } catch(e) {
            // error reading value
        }
    }


    const retirerBagde = () => {
        resetBadge()
        setBagde(false)
        call()
    }


    const call = async () => {
        const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')

        fetch('http://localhost:8080/api/retire-badge/' + numero_etudiant, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: {}
        })
    }



    useEffect(() => {
        donneEtudiant()

    }, [numero])

    return (

        <SafeAreaView style={styles.view_globale}>

        <View style={styles.view_image}>

            <ImagePersonnage image={etudiant.nom_personnage} size="normal"/>

            <Text style={styles.identite}>{ etudiant.prenom } { etudiant.nom }</Text>
            <Text style={styles.info_inscription}>Inscrit depuis le { etudiant.date_inscription }</Text>

        </View>

            {
                liste_choix.map((choix,i) => {
                    return(
                        <View style={[styles.un_parametre, !choix.operate ? styles.no_operate : '' ]} key={i} >
                            <FontAwesomeIcon icon={choix.icon}  color={"black"} size={ 20 }/>

                            <TouchableHighlight  onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
                                    choix.tag ? retirerBagde() : '' ,
                                    choix.operate ? navigation.navigate(choix.nom) : ''
                                }} underlayColor="white">
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>{choix.nom} {!choix.operate ? "(En travaux)" : ''}</Text>
                                    { choix.tag && (
                                        <View style={styles.tag_nouveau}>
                                            <Text style={{color: "white", fontFamily: "Dosis_800ExtraBold"}}>NOUVEAU</Text>
                                        </View>
                                    )}
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

                <TouchableHighlight onPress={AlertDeconnexion} underlayColor="white">
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




const AlertDeconnexion = () => {

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)

    Alert.alert(
        "Déconnexion",
        "Êtes-vous sûr de vouloir vous déconnecter ?",
        [
            {
                text: "Annuler", style: "cancel"
            },
            {
                text: "Déconnexion", style: "destructive", onPress: () => {
                    removeItemValue()
                }
            }
        ]
    );
}

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
        fontFamily: "Dosis_800ExtraBold",
        fontSize: 20
    },

    info_inscription: {
        fontFamily: "Dosis_200ExtraLight"
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
        fontSize: 18,
        color: "#5D5C5D",
        fontFamily: "Dosis_400Regular"
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
    },

    tag_nouveau: {
        backgroundColor: '#E76967',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        position: 'relative',
        marginLeft: 20
    },

    button: {
        flexDirection: "row"
    },

    no_operate: {
        opacity: 0.5
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
