import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, TouchableHighlight} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabEtudiant from "./TabEtudiant";
import React, {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InscriptionScreen from "./InscriptionScreen";
import * as Haptics from "expo-haptics";






export default function ConnexionScreen() {

    const [mail, changeMail] = React.useState(null);
    const [password, changePassword] = React.useState(null);

    const [hasError, setHasError] = React.useState(false);


    const connexion = () => {

        fetch('https://izlygo.herokuapp.com/api/connexion', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: mail,
                password: password
            })
        }).then(response => response.json())
            .then(data => {
                if(data.trouve == true){
                    console.log("ok")
                    connect(data.numero)
                }else {
                    setHasError(true)
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                }

            });
    }

    const connect = async (numero) => {
        try {
            await AsyncStorage.setItem('@numero_etudiant', JSON.stringify(numero))
            NativeModules.DevSettings.reload();
        } catch (e) {
            // error reading value
        }
    }


    return (
        <View style={styles.o}>


            <View style={[styles.vue_uneLigne]}>
                <Text style={styles.nom_input}>Votre adresse mail</Text>
                <TextInput
                    style={[styles.input, hasError ? styles.error : '']}
                    placeholder={"Ex: magalie.dupont@etu.univ-smb.fr"}
                    onChangeText={changeMail}
                    value={mail}
                    autoCapitalize='none'
                    autoComplete='off'
                />
            </View>

            <View style={styles.vue_uneLigne}>
                <Text style={styles.nom_input}>Votre mot de passe</Text>
                <TextInput
                    style={[styles.input, hasError ? styles.error : '']}
                    placeholder={"Mot de passe"}
                    onChangeText={ changePassword }
                    value={password}
                    autoCapitalize='none'
                    autoComplete='off'
                    secureTextEntry={true}
                />
            </View>

            {hasError && <Text style={styles.text_requis}>Les informations entrées sont incorrectes ou inexistantes.</Text> }

            <TouchableHighlight underlayColor="white" onPress={() => connexion()}>
                <View style={styles.bouton_continuer}>
                    <Text style={styles.text_bouton}>Connexion</Text>
                </View>
                </TouchableHighlight>






        </View>
    );





}


const styles = StyleSheet.create({
    o : {
        paddingHorizontal: "10%",
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        paddingTop: "30%",

    },



    vue_uneLigne: {
        marginVertical: 10
    },

    nom_input: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: "Dosis_700Bold"
    },

    input: {
        backgroundColor: "#EEEEEE",
        padding: 10,
        borderRadius: 10,
        height: 50,
    },

    bouton_continuer: {
        backgroundColor: "black",
        width: "50%",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        position: "absolute",
        right: 0
    },

    text_bouton: {
        textAlign: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "Dosis_700Bold",
        fontSize: 18
    },


    text_requis: {
        fontSize: 14,
        marginBottom: 20,
        color: "red",
        textAlign: "center",
        fontFamily: 'Dosis_400Regular'
    },

    error: {
        borderWidth: 2,
        borderColor: 'red'
    }
})



