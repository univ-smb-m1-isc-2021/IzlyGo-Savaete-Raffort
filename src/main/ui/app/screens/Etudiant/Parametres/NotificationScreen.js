import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, ScrollView, Switch} from 'react-native';
import React, {useEffect, useState} from "react";


import TitleText from "../../../components/TitleText"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationScreen() {
    const [change, setChange] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const donnesLesNotifications = async () => {
        try {

            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')

            const response = await fetch('https://izlygo.herokuapp.com/api/notifications/' + numero_etudiant);
            const json = await response.json();

            setNotifications(json);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        donnesLesNotifications();
    }, [change]);

    const getImage = name => {
        switch (name) {
            case "rubis": return require("../../images/rubis.png")
            case "saphir": return require("../../images/saphir.png")
            case "emeraude": return require("../../images/emeraude.png")
            case "amethyste": return require("../../images/amethyste.png")
            case "tourmaline": return require("../../images/tourmaline.png")
            case "ambre": return require("../../images/ambre.png")
            default: return require("../../images/ambre.png")
        }
    }

    const changeSwitch = id =>{
        fetch('https://izlygo.herokuapp.com/api/edit/notification/' + id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((json) => {
            setChange(!change)
        })


    }



    return (
        <View style={styles.view_globale}>

            <TitleText title={"Apparition d'une gemme"} />

            <ScrollView>

                {
                    notifications.map((notif, i) => {
                        return(

                            <View style={styles.view_succes} key={notif.id}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#" + notif.gemme.couleur }}
                                    thumbColor={"#f4f3f4"}
                                    onValueChange={changeSwitch.bind("id", notif.id)}
                                    value={notif.etat}
                                />


                                    <Image
                                        style={styles.tinyLogo}
                                        source={getImage(notif.gemme.chemin_image)}
                                    />
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

    view_succes: {
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

    text : {
        fontSize: 15
    },

    tinyLogo: {
        width: 30,
        height: 30,
    },


})






