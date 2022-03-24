import {StyleSheet, Share, Text, View, TextInput, Button, Image, NativeModules, ScrollView, TouchableOpacity, Clipboard} from 'react-native';
import React, {useEffect, useState} from "react";
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

            const response = await fetch('https://izlygo.herokuapp.com/' + numero_etudiant);
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
            <View style={styles.view_title}>

                <View style={styles.view_icon}>
                    <FontAwesomeIcon icon={faGift}  color={"#E76967"} size={ 40 } />
                </View>

                <Text style={styles.title}> Parrainer des étudiants pour obtenir encore plus de récompenses</Text>

                <View style={styles.rewards}>
                    <Text style={styles.title_rewards}>Pour vous</Text>

                    <View style={styles.rewards_icon}>
                        <Image style={styles.tinyLogo} source={require('../../images/saphir.png')}/>
                        <Image style={styles.tinyLogo} source={require('../../images/saphir.png')}/>
                    </View>
                </View>

                <View style={styles.rewards}>
                    <Text style={styles.title_rewards}>Pour votre filleul </Text>

                    <View style={styles.rewards_icon}>
                        <Image style={styles.tinyLogo} source={require('../../images/emeraude.png')}/>
                        <Image style={styles.tinyLogo} source={require('../../images/emeraude.png')}/>
                        <Image style={styles.tinyLogo} source={require('../../images/emeraude.png')}/>
                    </View>
                </View>

            </View>


            <View style={styles.view_title}>
                <Text style={styles.title}>Mon code parrainage</Text>
                    <TouchableOpacity onPress={() => copyToClipboard(code)}>
                        <Text style={{textAlign: "center", fontFamily: "Dosis_400Regular", fontSize: 20, textDecorationLine: "underline"}}>{ code }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onShare()}>
                        <Text style={{marginTop: 10, textAlign: "center", fontFamily: "Dosis_200ExtraLight", fontSize: 15}}>Cliquez ici pour partager mon code</Text>
                    </TouchableOpacity>
            </View>





            {
                filleuls.length > 0 &&
                <View>
                    <Text style={styles.title_filleuls}>Liste de vos filleuls</Text>
                </View>
            }


            <ScrollView>

                {
                    filleuls.map((filleul, i) => {
                        return(
                            <View style={styles.view_title} key={i}>
                                <Text style={styles.title}>{filleul.nom_complet}</Text>
                                <Text style={{textAlign: 'center', fontFamily: "Dosis_200ExtraLight", fontSize: 15}}>{filleul.nombre_points} points</Text>
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
        textAlign: "center",
        fontFamily: "Dosis_600SemiBold",
        fontSize: 20
    },

    view_title: {
        backgroundColor: "#EFEFEF",
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 15,


    },

    view_icon: {
        flexDirection: "row",
        justifyContent: "center"
    },

    info: {
        textAlign: "center"
    },

    tinyLogo: {
        width: 20,
        height: 20,
    },

    title_rewards: {
        fontFamily: "Dosis_300Light",
        fontSize: 15
    },

    rewards: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    rewards_icon: {
        flexDirection: "row",
    },

    title_filleuls: {
        fontWeight: "100",
        fontFamily: "Dosis_200ExtraLight",
        fontSize: 20,
        marginTop: 20,
        marginLeft: 20
    }



})



