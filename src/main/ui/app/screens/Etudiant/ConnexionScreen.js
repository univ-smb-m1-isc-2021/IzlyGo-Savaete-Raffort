import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, TouchableHighlight} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabEtudiant from "./TabEtudiant";
import React, {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InscriptionScreen from "./InscriptionScreen";






export default function ConnexionScreen() {

    const [mail, changeMail] = React.useState(null);
    const [password, changePassword] = React.useState(null);

    const [error, setError] = React.useState('');


    const connexion = () => {

        fetch('http://localhost:8080/api/connexion', {
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
                    setError("Les informations entrées sont incorrectes ou inexistantes.")
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



            <View style={styles.vue_uneLigne}>
                <Text style={styles.nom_input}>Votre adresse mail</Text>
                <TextInput
                    style={styles.input}
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
                    style={styles.input}
                    placeholder={"Mot de passe"}
                    onChangeText={changePassword}
                    value={password}
                    autoCapitalize='none'
                    autoComplete='off'
                    secureTextEntry={true}
                />
            </View>


            <Text style={styles.text_requis}>{error}</Text>




            <TouchableHighlight underlayColor="white" onPress={() => connexion()}>
                <View style={styles.bouton_continuer}>
                    <Text style={styles.text_bouton}>Connexion</Text>
                </View>
            </TouchableHighlight>


            <Button title="Mot de passe oublié ?"/>
        </View>
    );





}


const styles = StyleSheet.create({
    o : {
        paddingTop: 100,
        paddingHorizontal: "10%",
        backgroundColor: "white",
        height: "100%",
        width: "100%"

    },

    vue_uneLigne: {
        marginVertical: 10
    },

    nom_input: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10,
    },

    input: {
        backgroundColor: "#EEEEEE",
        padding: 10,
        borderRadius: 10,
        height: 50,
    },

    bouton_continuer: {
        backgroundColor: "#EAAE7B",
        //width: "30%",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        //  position: "absolute",
        right: 0
    },

    text_bouton: {
        textAlign: "center",
        justifyContent: "center"
    },


    text_requis: {
        fontSize: 10,
        color: "red",
        textAlign: "center"
    },
})



