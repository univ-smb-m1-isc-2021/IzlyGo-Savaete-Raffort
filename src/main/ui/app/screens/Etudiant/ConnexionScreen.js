import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabEtudiant from "./TabEtudiant";
import React, {useEffect} from "react";




export default function ConnexionScreen() {


    return (
        <View style={styles.o}><Text>hhhkkkkkkk</Text>


        <Button title={"Connexion"} onPress={connexion}/>
        </View>
    );
}

const connexion = async () => {
    try {
        await AsyncStorage.setItem('@numero_etudiant', JSON.stringify(123))
        NativeModules.DevSettings.reload();
    } catch(e) {
        // error reading value
    }
}



const styles = StyleSheet.create({
    o : {
        marginTop: 100
    }
})


