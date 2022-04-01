import {StyleSheet, Text, View, TextInput, Button, Image, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from "react";
import { Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from '@expo-google-fonts/dosis'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import {useFonts} from "expo-font";
import ImageGemme from "../../components/ImageGemme";

export default function ListeScreen() {

    const [gemmes, setGemmes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [numero, setNumero] = useState(null);

    
    const donneGemmes = async () => {
        try {

            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')
            setNumero(numero_etudiant)

            const response = await fetch('http://localhost:8080/api/inventaire/' + numero_etudiant);
            const json = await response.json();

            setGemmes(json);
            setIsLoading(true);

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        donneGemmes();
    }, [isLoading, gemmes]);




    return(


        <SafeAreaView>

            {
                isLoading ?
                    <View style={styles.main}>
                        <View style={styles.points}>
                            <Text style={styles.points4}>Total de vos points IzlyGo :</Text>
                            <Text style={styles.points2}> {gemmes.etudiant.nombre_points} points</Text>
                            <Text style={styles.points3}>Soit {gemmes.etudiant.nombre_euros} €</Text>
                        </View>

                        <ScrollView style={{ marginBottom: 150}}>

                            <View>
                                <Text style={styles.titleGemme}>Mes gemmes</Text>
                            </View>

                            <View style={styles.container}>

                                {
                                    gemmes.gemmes.map((twice, i) => {

                                            var o = require("../images/tourmaline.png");
                                            return (
                                                <View style={styles.row} key={i}>

                                                    {
                                                        twice.map((app, o) => {


                                                                return (
                                                                    <View style={styles.item} key={o}>
                                                                        <View
                                                                            style={[styles.titleView, styles.color(app.couleur)]}>
                                                                            <Text style={styles.titleItem}>{app.nom}</Text>
                                                                        </View>
                                                                        <View style={[styles.row, styles.secondPart]}>
                                                                            <View>

                                                                                <ImageGemme image={app.chemin_image} size="tiny"/>

                                                                            </View>
                                                                            <View style={styles.number}>
                                                                                <Text
                                                                                    style={styles.numberText}>{app.quantite}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={styles.conversion}>
                                                                            <Text style={styles.conversionText}>{
                                                                                app.quantite == 0 ? "Aucun" : app.valeur_points + " points (Soit " + app.valeur_euro + "€)"
                                                                            }</Text>
                                                                        </View>
                                                                    </View>
                                                                )
                                                            }
                                                        )}

                                                </View>
                                            )
                                        }
                                    )}


                            </View>

                            <View>
                                <Text style={styles.titleGemme}>Mes objets</Text>
                            </View>

                            <View style={styles.row}>

                                <View style={styles.item}>
                                    <View style={[styles.titleView, styles.gray]}>
                                        <Text style={styles.titleItem}>"La panière"</Text>
                                    </View>
                                    <View style={[styles.row, styles.secondPart]}>
                                        <View>
                                            <Image
                                                style={styles.tinyLogo}
                                                source={require('../images/croissant.png')}
                                            />
                                        </View>
                                        <View style={styles.number}>
                                            <Text style={styles.numberText}>0</Text>
                                        </View>
                                    </View>
                                    <View style={styles.conversion}><Text style={styles.conversionText}>Voir modalités
                                        d'utilisation</Text></View>
                                </View>


                                <View style={styles.item}>
                                    <View style={[styles.titleView, styles.gray]}>
                                        <Text style={styles.titleItem}>"Le super"</Text>
                                    </View>
                                    <View style={[styles.row, styles.secondPart]}>
                                        <View>
                                            <Image
                                                style={styles.tinyLogo}
                                                source={require('../images/biere.png')}
                                            />
                                        </View>
                                        <View style={styles.number}>
                                            <Text style={styles.numberText}>0</Text>
                                        </View>
                                    </View>
                                    <View style={styles.conversion}><Text style={styles.conversionText}>Voir modalités
                                        d'utilisation</Text></View>
                                </View>


                            </View>


                        </ScrollView>


                    </View>
                    :
                    <View style={{flexDirection: "row", justifyContent: "center", height: "100%"}}>
                        <ActivityIndicator size="large" color="#2c3e50"/>
                    </View>
            }

        </SafeAreaView>
    )


}




const styles = StyleSheet.create({


    container: {
        backgroundColor: '#fff',
    },
    main: {
        backgroundColor: "white"
    },
    row : {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 30
    },
    titleItem: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        fontFamily: "Dosis_700Bold"
    },
    titleView: {
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5,
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        backgroundColor: "#EFF0F3",
        height: 130,
        width: "45%",
        alignItems: "center",
        borderRadius: 10
    },

    red : {
        backgroundColor: "#E76967",
    },
    blue : {
        backgroundColor: "#82C5F1",
    },
    green : {
        backgroundColor: "#63D7B9",
    },
    purple : {
        backgroundColor: "#B689E7",
    },
    black : {
        backgroundColor: "#373F4A",
    },
    yellow : {
        backgroundColor: "#EAAE7B",
    },
    gray : {
        backgroundColor: "#989FAA",
    },

    color : function(hexa) {
        return {
            backgroundColor: "#" + hexa,
        }
    },



    tinyLogo: {
        width: 40,
        height: 40,
    },

    conversion: {
        position: "absolute",
        bottom: 10
    },
    conversionText: {
      fontSize: 12,
      color: "gray",
        fontFamily: "Dosis_300Light"
    },

    number: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
    },
    numberText: {
        fontSize: 30,
        fontFamily: "Dosis_400Regular"

    },
    secondPart: {
        marginTop: 20
    },

    points : {
        backgroundColor: "#F0F2F5",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    points2: {
        fontSize: 20,
        padding: 5,
        fontFamily: "Dosis_700Bold"
    },

    points3: {
        fontSize: 12,
        fontFamily: "Dosis_300Light"
    },

    points4: {
        fontFamily: "Dosis_500Medium",
        fontSize: 20
    },

    titleGemme: {
        fontWeight: "100",
        fontFamily: "Dosis_200ExtraLight",
        fontSize: 20,
        margin: 20
    }
});
