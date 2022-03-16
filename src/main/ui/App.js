import React from 'react';
import {StyleSheet, View} from 'react-native';

import InscriptionScreen from "./app/screens/Etudiant/InscriptionScreen";
import TabEtudiant from "./app/screens/Etudiant/TabEtudiant";
import TabEntreprise from "./app/screens/Entreprise/TabEntreprise";

export default class App extends React.Component{

    render() {

        let retour;

        let nombre = 2
        
        if(nombre ==1){
            retour = <InscriptionScreen></InscriptionScreen>
        }else if (nombre == 2) {
            retour = <TabEtudiant></TabEtudiant>
        }else {
            retour = <TabEntreprise></TabEntreprise>
        }

        return (
            <View style={superStyle.view}>
                {retour}
            </View>
        );
    }
}

const superStyle = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%'
    }
})