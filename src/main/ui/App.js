import React, { Component, useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';

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


       /* if(nombre ==1){
            retour = <InscriptionScreen></InscriptionScreen>
        }else if (nombre == 2) {
            retour = <TabEtudiant></TabEtudiant>
        }else if (nombre == 3){
            retour = <TabEntreprise></TabEntreprise>
        }else if (nombre == 4){
            retour = <ConnexionScreen></ConnexionScreen>
        }*/

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