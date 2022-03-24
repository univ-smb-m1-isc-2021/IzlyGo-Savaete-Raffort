import {StyleSheet, View, Image, Text, Alert, ActivityIndicator, SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import React, {useEffect, useState} from "react";
import { useFonts } from 'expo-font'
import moment from 'moment';

import { Root, Popup, Toast } from 'popup-ui'


import AppLoading from 'expo-app-loading'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MapScreen() {

    const [points, setPoints] = useState([]);

    const [currentDate, setCurrentDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [numero, setNumero] = useState(0)

    const [refresh, setRefresh] = useState(false)

    const childToParent = () => {
        setRefresh(!refresh)
    }



    const donneGemmes = async () => {
        try {
            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')
            setNumero(numero_etudiant)

            const response = await fetch('https://izlygo.herokuapp.com/api/tirage/' + numero_etudiant);
            const json = await response.json();

            setPoints(json["liste"]);
            setLoading(true)

        } catch (error) {
            console.error(error)
        }
    }

    const getImage = name => {
        switch (name) {
            case "rubis": return require("../images/rubis.png")
            case "saphir": return require("../images/saphir.png")
            case "emeraude": return require("../images/emeraude.png")
            case "amethyste": return require("../images/amethyste.png")
            case "tourmaline": return require("../images/tourmaline.png")
            case "ambre": return require("../images/ambre.png")
            default: return require("../images/ambre.png")
        }
    }
    
    function markerClick(tirage){

        Alert.alert(
            "" + tirage.gemme.nom,
            "" + tirage.recupere + "/" + tirage.gemme.personne_max,
            [
                {
                    text: "Annuler", style: "cancel"
                },
                { text: "Oui", onPress:() => {
                        fetch('https://izlygo.herokuapp.com/api/recupere', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({chaine: tirage.chaine, id_etudiant: numero})
                        }).then(response => response.json())
                            .then(data => {
                               console.log(data)
                                setRefresh(!refresh)

                            });
                    }

                }
            ]

        );
    }


    useEffect(() =>  {
        donneGemmes();
    }, [refresh]);

    return (
        <Root>

        <SafeAreaView style={styles.all}>
            <Clock childToParent={childToParent}></Clock>
            <View style={styles.container}>
                {
                    !loading ?
                        <SafeAreaView style={{ flexDirection: "row", justifyContent: "center", height: "100%"}}>
                            <ActivityIndicator size="large" color="#2c3e50"/>

                        </SafeAreaView> :

                    loading &&points.length != 0 ?
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: 45.64341,
                                longitude: 5.86990,
                                latitudeDelta: 0.012,
                                longitudeDelta: 0.012,
                            }}
                        >

                        {
                            points.map((pt, i) => {
                                return (
                                    <MapView.Marker
                                        key={pt.latitude}
                                        coordinate={{ latitude : pt.latitude , longitude :pt.longitude }}
                                        onPress={() => markerClick(pt)}
                                    >

                                        <Image source={getImage(pt.gemme.chemin_image)} style={{height: 35, width:35 }} />
                                    </MapView.Marker>
                                )
                            })

                        }

                        </MapView> :

                        <View style={[styles.container, styles.view_vide]}>
                            <Image style={styles.image_vide} source={require("../images/map_vide.png")}></Image>
                            <Text style={styles.text_vide}>À cette heure-ci, il n'y a pas de carte.</Text>
                            <Text style={styles.text_vide2}>Reviens demain à partir de 7h.</Text>
                        </View>

                }
            </View>
        </SafeAreaView>
        </Root>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    map: {
        width: "100%",
        height: "100%"
    },
    
    all : {
        width: "100%",
        height: "100%"
    },

    image_vide: {
        width: "30%",
        height: "30%"
    },
    view_vide : {
        width: "100%",
        height: "100%",
        marginTop: "40%"
    },

    text_vide: {
        marginTop: 20,
        fontFamily: "Dosis_200ExtraLight",
        fontSize: 22
    },

    text_vide2: {
        marginTop: 10,
        fontFamily: "Dosis_200ExtraLight",
        fontSize: 18
    }
});



function Clock ({childToParent}) {

    const [letimer, setTimer] = useState('');
    const [color, setColor] = useState('black');
    const tick = () => {


        var timer = ''

        const a = moment()
        var hours = a.hours(); //Current Hours
        var min = a.minutes(); //Current Minutes
        var sec = a.seconds(); //Current Seconds

        var b = ''

        if (min < 30) {
            b = moment(hours + ':30:00', 'HH:mm:ss')
        }else {
            var h = hours + 1
            b = moment(h + ':00:00', 'HH:mm:ss')
        }

        const dif = b.diff(a, 'second');

        if(dif > 0 && dif < 60) {
            timer = "Il reste " + dif + " secondes";
        }
        else {
            var min = Math.trunc(dif/60)
            var sec = dif - (min*60)
            var timer = "Il reste " + min + " min et " + sec + " secondes";
        }

        if(dif == 0){
            childToParent()
        }


        setTimer(timer)
        setColor(dif < 60 ? "red" : "black")




    }


    useEffect(() =>  {
        setInterval(() => tick(), 1000)

    }, []);





        return (
            <Text className="App-clock" style={{margin: 10, textAlign: 'center', fontWeight: 'bold', color: color}}>
                {letimer}
            </Text>
        );

}
