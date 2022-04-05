import React, { Component, useEffect, useState } from 'react';
import {NativeModules, StyleSheet, View} from 'react-native';

import InscriptionScreen from "./app/screens/Etudiant/InscriptionScreen";
import ConnexionScreen from "./app/screens/Etudiant/ConnexionScreen";
import TabEtudiant from "./app/screens/Etudiant/TabEtudiant";
import TabEntreprise from "./app/screens/Entreprise/TabEntreprise";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccueilScreen from "./app/screens/Etudiant/AccueilScreen";
import { Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from '@expo-google-fonts/dosis'
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";

export default function App(){

        let [fontsLoaded] = useFonts({Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold});


        const [numero, setNumero] = useState(0);
        const [retour, setRetour] = useState();

        const FiltreScreen = async () => {
            try {
                await AsyncStorage.setItem('@url', 'http://localhost:8080')

                const value = await AsyncStorage.getItem('@numero_etudiant')
                await setNumero(value)
            } catch(e) {
                // error reading value
            }
        }


        useEffect(() => {
            FiltreScreen()


            if(numero == null){
                setRetour(<AccueilScreen></AccueilScreen>)
                //setRetour(<InscriptionScreen></InscriptionScreen>)
            }else if (numero > 0){
                setRetour(<TabEtudiant></TabEtudiant>)
            }

        }, [numero])

    if (!fontsLoaded) {
        return <AppLoading />;
    }


        return (
            <View style={superStyle.view}>
                {retour}
            </View>
        );

}

const superStyle = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%'
    }
})