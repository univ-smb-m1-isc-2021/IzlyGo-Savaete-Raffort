import {
    StyleSheet,
    View,
    Image,
    Text,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    Modal,
    Pressable,
    Button
} from "react-native";
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import React, {useEffect, useState} from "react";
import { useFonts } from 'expo-font'
import moment from 'moment';

import { Root, Popup, Toast } from 'popup-ui'

import MapModal from "../../components/Modal/MapModal";


import * as Location from 'expo-location';


import AppLoading from 'expo-app-loading'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageGemme from "../../components/ImageGemme";
import SuccesModal from "../../components/Modal/SuccesModal";
import AjoutGemmeModal from "../../components/Modal/AjoutGemmeModal";

import * as Haptics from 'expo-haptics';

export default function MapScreen({miam}) {


    function sleep(time){
        return new Promise((resolve)=>setTimeout(resolve,time)
        )
    }

    const [points, setPoints] = useState([]);

    const [loading, setLoading] = useState(false)
    const [numero, setNumero] = useState(0)

    const [refresh, setRefresh] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);
    const [modalSucces, setModalSucces] = useState(false);
    const [modalGemme, setModalGemme] = useState(false);
    const [tirageSelection, setTirageSelection] = useState(null);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const childToParent = () => {
        setRefresh(!refresh)
    }



    const donneGemmes = async () => {
        try {
            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')
            const url = await AsyncStorage.getItem('@url')
            setNumero(numero_etudiant)

            const response = await fetch(url + '/api/tirage/' + numero_etudiant);
            const json = await response.json();

            setPoints(json);
            setLoading(true)

        } catch (error) {
            console.error(error)
        }
    }

    function recupereGemme(tirage){

        fetch('http://localhost:8080/api/recupere', {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chaine: tirage.chaine, id_etudiant: numero})
        }).then(response => response.json())
            .then(data => {
                if (true){
                    setModalGemme(true)
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                    sleep(2000).then(()=>{
                        setModalGemme(false)
                        console.log("data.existe_succes_fini")
                        console.log(data)


                        if (data.existe_succes_fini == true){
                            miam()

                            setModalSucces(true)
                            sleep(3000).then(()=>{
                                setModalSucces(false)
                            })
                        }
                    })
                }

                setRefresh(!refresh)

            });
    }


    useEffect(() =>  {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location.coords.latitude)
        })();


        console.log("dorefresh")
        //miam()
        //console.log(doRefresh)

        donneGemmes();
    }, [refresh, modalVisible]);


    let difflat;
    let difflong;
    return (


        <SafeAreaView style={styles.all}>




            <Clock childToParent={childToParent}></Clock>

            <SuccesModal visibility={modalSucces}></SuccesModal>
            <AjoutGemmeModal visibility={modalGemme} gemme={tirageSelection != null ?tirageSelection.gemme : ''}></AjoutGemmeModal>


            {
                tirageSelection != null &&



                <Modal animationType="slide"
                       transparent={true}
                       visible={modalVisible}
                       onRequestClose={() => { setModalVisible(!modalVisible); }}
                >
                    <View style={stylesModal.centeredView}>
                        <View style={stylesModal.modalView}>

                            <Pressable style={{ position: 'absolute', right: 0, padding: 20 }}  onPress={() => { setModalVisible(!modalVisible), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) }}>
                                <Text style={{color: "gray", fontSize: 30}}>X</Text>
                            </Pressable>

                            <Text style={stylesModal.title_modal}> Gemme { tirageSelection.gemme.nom }</Text>

                            <View style={stylesModal.view_container}>
                                <View>
                                    <ImageGemme image={tirageSelection.gemme.chemin_image} size="big"/>
                                    <Text style={{
                                        textAlign: "center",
                                        fontFamily: 'Dosis_200ExtraLight',
                                        color: 'gray',
                                        fontSize: 20
                                    }}>{tirageSelection.gemme.valeur} {tirageSelection.gemme.valeur > 1 ? 'points' : 'point'}</Text>
                                </View>

                                <View style={{justifyContent: 'center'}}>
                                    <Text style={{fontFamily: "Dosis_500Medium", fontSize: 18}}>
                                        <Text style={{fontFamily: "Dosis_800ExtraBold"}}>Limitation :</Text> {tirageSelection.recupere} / {tirageSelection.gemme.personne_max}
                                    </Text>
                                </View>
                            </View>

                            {

                                (Math.abs(tirageSelection.latitude - location.coords.latitude) <= 0.0001 && Math.abs(tirageSelection.longitude - location.coords.longitude <= 0.0001)) ?

                                    <Pressable style={[stylesModal.button, stylesModal.buttonClose, {backgroundColor: '#' + tirageSelection.gemme.couleur }]} onPress={() => { setModalVisible(!modalVisible), recupereGemme(tirageSelection) }}>
                                        <Text style={stylesModal.textStyle}>Récupérer</Text>
                                    </Pressable>

                                : // SINON
                                    <View style={{marginTop: 20}}>
                                        <Text style={{textAlign: 'center', color: 'red'}}>Vous êtes trop loin, rapprochez vous.</Text>
                                    </View>
                            }
                        </View>
                    </View>
                </Modal>
            }



            <View style={styles.container}>
                { !loading ?
                    <SafeAreaView style={{ flexDirection: "row", justifyContent: "center", height: "100%"}}>
                        <ActivityIndicator size="large" color="#2c3e50"/>
                    </SafeAreaView>

                    : loading  ?

                        <MapView style={styles.map} mapType={"standard"} region={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0012,
                            longitudeDelta: 0.0012,
                        }} showsUserLocation={true}>



                            { points.liste.map((pt, i) => { 
                                return (
                                    <MapView.Marker
                                        key={pt.latitude}
                                        coordinate={{ latitude : pt.latitude , longitude :pt.longitude }}
                                        onPress={() => {setModalVisible(true), setTirageSelection(pt), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} /*markerClick(pt)*/}
                                    >
                                        <ImageGemme image={pt.gemme.chemin_image} size="very-tiny"/>
                                    </MapView.Marker>
                                )
                            })}

                            </MapView>

                        : <View style={[styles.container, styles.view_vide]}>
                            <Image style={styles.image_vide} source={require("../images/map_vide.png")}></Image>
                            <Text style={styles.text_vide}>À cette heure-ci, il n'y a pas de carte.</Text>
                            <Text style={styles.text_vide2}>Reviens demain à partir de 7h.</Text>
                          </View>
                    }
            </View>
        </SafeAreaView>

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


    function sleep(time){
        return new Promise((resolve)=>setTimeout(resolve,time)
        )
    }

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

        const dif = b.diff(a, 'second')

        if(dif > 0 && dif < 60) {
            timer = "Il reste " + dif + " secondes ";
        }
        else {
            var min = Math.trunc(dif/60)
            var sec = dif - (min*60)
            var timer = "Il reste " + min + " min et " + sec + " secondes ";
        }

        if(dif == 0){
            timer = "Rechargement des gemmes ..."
            sleep(2000).then(()=>{
                childToParent()
            })
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

const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalView2: {
        marginHorizontal: 30,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    button: {
        borderRadius: 20,
        padding: 10,
        marginTop: 40
    },

    buttonClose: {
        backgroundColor: "#EAAE7B",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'Dosis_700Bold',
        fontSize: 20
    },

    view_container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    tiny_icon : {
        width: 75,
        height: 75
    },

    title_modal: {
        textAlign: "center",
        fontFamily: "Dosis_200ExtraLight",
        fontSize: 25,
        paddingBottom: 20
    }
});
