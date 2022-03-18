import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabEtudiant from "./TabEtudiant";
import React, {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import InscriptionScreen from "./InscriptionScreen";






export default function ConnexionScreen() {

    const [mail, changeMail] = React.useState(null);
    const [password, changePassword] = React.useState(null);

    const connexion = () => {

        console.log("JAI CLIQUE")

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

            <TextInput
                style={styles.input}
                placeholder={"Adresse mail"}
                onChangeText={changeMail}
                value={mail}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect='false'
            />

            <TextInput
                style={styles.input}
                placeholder={"Mot de passe"}
                onChangeText={changePassword}
                value={password}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect='false'

            />


            <Button title={"Connexion"} onPress={connexion}/>
        </View>
    );





}


const styles = StyleSheet.create({
    o : {
        marginTop: 100
    },

    input: {
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 20,
        color: "black",
        borderRadius: 10,
        textAlign: "center"
    }
})



