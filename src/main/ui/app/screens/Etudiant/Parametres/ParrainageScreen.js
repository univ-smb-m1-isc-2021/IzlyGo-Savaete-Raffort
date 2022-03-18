import {StyleSheet, Share, Text, View, TextInput, Button, Image, NativeModules, ScrollView, TouchableOpacity, Clipboard} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleText from "../../../components/TitleText"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faGift, faMedal} from '@fortawesome/free-solid-svg-icons'


export default function ParrainageScreen() {

    const [filleuls, setFilleuls] = useState([]);
    const [code, setCodeParrain] = useState([]);

    const donneLesFilleuls = async () => {
        try {

            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')

            const response = await fetch('http://localhost:8080/api/filleuls/' + numero_etudiant);
            const json = await response.json();

            setFilleuls(json.filleuls);
            setCodeParrain(json.code_parrain)

        } catch (error) {
            console.error(error);
        }
    }

    const copyToClipboard = (code) => {
        Clipboard.setString(code)
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "Partagez votre code parrainage à un autre étudiant.",
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        donneLesFilleuls();
    }, []);

    return (
        <View style={styles.view_globale}>
            <Text style={styles.title}> Parrainer des étudiants pour obtenir plus de récompenses</Text>

            <FontAwesomeIcon icon={faGift}  color={"#FEE101"} size={ 40 } />

            <View style={styles.view_gray}>
                <Text style={styles.info}>3 rubis pour vous</Text>
                <Text style={styles.info}>3 rubis pour votre filleul</Text>
            </View>

            <Text>Mon code parrainage :
                <TouchableOpacity onPress={() => copyToClipboard(code)}>
                    <Text>{ code }</Text>
                </TouchableOpacity>
            </Text>
            <Button title={"Partager"} onPress={onShare}/>


            <Text>Liste de vos filleuls</Text>

            <ScrollView>

                {
                    filleuls.map((filleul, i) => {
                        return(
                            <View style={styles.view_gray}>
                                <Text>{filleul.nom_complet}</Text>
                                <Text>{filleul.nombre_points} points</Text>
                            </View>
                        )

                    })
                }

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    view_globale : {
        backgroundColor: "white",
        height: "100%",
        width: "100%"
    },

    title: {
        textAlign: "center"
    },

    view_gray: {
        backgroundColor: "#F0F1F3",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    info: {
        textAlign: "center"
    }



})



