import React, { Component, useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';

import InscriptionScreen from "./app/screens/Etudiant/InscriptionScreen";
import ConnexionScreen from "./app/screens/Etudiant/ConnexionScreen";
import TabEtudiant from "./app/screens/Etudiant/TabEtudiant";
import TabEntreprise from "./app/screens/Entreprise/TabEntreprise";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(){



        const [numero, setNumero] = useState(null);
        const [retour, setRetour] = useState();

        const FiltreScreen = async () => {
            try {
                const value = await AsyncStorage.getItem('@numero_etudiant')
                setNumero(value)


                if(numero == null){
                    setRetour(<ConnexionScreen></ConnexionScreen>)
                }else {
                    setRetour(<TabEtudiant></TabEtudiant>)
                }
            } catch(e) {
                // error reading value
            }
        }


        useEffect(() => {
            FiltreScreen()

        }, [numero])


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