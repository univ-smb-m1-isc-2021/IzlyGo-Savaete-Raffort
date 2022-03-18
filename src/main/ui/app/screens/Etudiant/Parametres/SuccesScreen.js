import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, ScrollView} from 'react-native';
import { Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from '@expo-google-fonts/dosis'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar, Colors } from 'react-native-paper';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar as ETOILE_PLEINE } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faStar as ETOILE_VIDE } from '@fortawesome/free-regular-svg-icons'
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SuccesScreen() {

    const [succes, setSucces] = useState([]);
    const [loading, setLoading] = useState(false);

    const donnesLesSucces = async () => {
        try {

            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')

            const response = await fetch('http://localhost:8080/api/succes/' + numero_etudiant);
            const json = await response.json();

            setSucces(json.succes);

            setLoading(true)



        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        donnesLesSucces();
    }, [loading]);


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


    return (
        <View style={styles.view_globale}>

            <ScrollView>

            {
                succes.map((suc, i) => {
                    return (
                        <View style={[styles.view_succes, suc.etoile == 3 ? styles.jjj : ""]} key={i}>

                            <Text style={styles.libelle_succes}>{suc.libelle}</Text>

                            <>
                                {suc.etoile < 3 ? <Text style={styles.quantite_succes}>{suc.avancement + "/" + suc.quantite_voulue}</Text> : <></> }
                            </>

                            <>
                                {suc.etoile < 3 ? <ProgressBar  style={styles.progress_bar} progress={suc.pourcentage} color={"#" + suc.gemme.couleur} /> : <></> }
                            </>


                            <View style={styles.view_footer}>
                                <View style={styles.view_etoiles}>
                                    {
                                        <>
                                            <FontAwesomeIcon icon={ (suc.etoile >= 1 ? ETOILE_PLEINE : ETOILE_VIDE) } color={"#EAAE7B"} size={ 40 } />
                                            <FontAwesomeIcon icon={ (suc.etoile >= 2 ? ETOILE_PLEINE : ETOILE_VIDE) } color={"#EAAE7B"} size={ 40 } />
                                            <FontAwesomeIcon icon={ (suc.etoile >= 3 ? ETOILE_PLEINE : ETOILE_VIDE) } color={"#EAAE7B"} size={ 40 } />
                                        </>
                                    }

                                </View>


                                <>
                                    {suc.etoile < 3 ?   <View style={styles.view_recompense}>
                                        <Text style={styles.text_recompense}>{suc.quantite_recompense}</Text>
                                        <Image
                                            style={styles.tinyLogo}
                                            source={getImage(suc.gemme.chemin_image)}
                                        />
                                    </View> : <FontAwesomeIcon icon={faCircleCheck}  color={"#EAAE7B"} size={ 40 } /> }
                                </>


                            </View>

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

    view_etoiles: {
        flexDirection: "row"
    },
    progress_bar: {
        margin: 10,
        borderRadius: 10,
        height: 15
    },


    view_succes : {
        backgroundColor: "#F0F1F3",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        padding: 10
    },

    libelle_succes: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    quantite_succes: {
        textAlign: "center"
    },

    tinyLogo: {
        width: 30,
        height: 30,
    },

    view_recompense: {
        flexDirection: "row",
        marginTop: 10,
        width: "20%",
        justifyContent : "space-around"
    },

    view_footer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    text_recompense: {
        fontSize: 25
    },

    jjj : {
        opacity: 0.5
    }



})



