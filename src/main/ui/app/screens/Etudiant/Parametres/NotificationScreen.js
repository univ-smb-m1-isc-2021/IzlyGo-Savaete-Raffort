import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, ScrollView, Switch} from 'react-native';
import React, {useEffect, useState} from "react";


import TitleText from "../../../components/TitleText"
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageGemme from "../../../components/ImageGemme";



export default function NotificationScreen() {
    const [change, setChange] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const donnesLesNotifications = async () => {
        try {

            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')
            const url = await AsyncStorage.getItem('@url')

            const response = await fetch( url + '/api/notifications/' + numero_etudiant);
            const json = await response.json();

            setNotifications(json);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        donnesLesNotifications();
    }, [change]);


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

                                    <ImageGemme image={notif.gemme.chemin_image} size="very-tiny"/>


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
    }
})






