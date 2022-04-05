import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, ScrollView} from 'react-native';
import React, {useEffect, useState} from "react";
import {
    faFaceAngry,
    faFaceFlushed,
    faFaceGrinBeam, faFaceGrinTongue, faFaceGrinWide, faFaceLaughWink, faFaceMeh, faFaceSadTear,
    faFaceSmile,
    faFaceSmileBeam,
    faGrinHearts, faGrinStars
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import ImagePersonnage from "../../../components/ImagePersonnage";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ClassementScreen() {

    const [classement, setClassement] = useState([]);

    const donnesLeClassement = async () => {
        try {

            const url = await AsyncStorage.getItem('@url')

            const response = await fetch(url + '/api/classement/10');
            const json = await response.json();

            setClassement(json);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        donnesLeClassement();
    }, []);



 
    return (
        <View style={styles.view_globale}>

            <View style={styles.vue_classement}>
                {
                    classement.map((etudiant, i) => {
                        if (i < 3){
                            return(
                                <View style={styles.vue_classement2}>
                                    <Text style={styles.numero_meilleurs}>{i+1}</Text>
                                    <ImagePersonnage image={etudiant.nom_personnage} size={i == 1 ? 'normal' : (i == 0) ? 'small' : 'tiny'}/>

                                    <Text style={styles.text_meilleurs}>{etudiant.prenom} {etudiant.nom}</Text>
                                    <Text style={styles.text_points_meilleurs}>{etudiant.nombre_points_semaine} pts</Text>
                                </View>
                            )
                        }

                    })
                }





            </View>



            <ScrollView>
                {
                    classement.map((etudiant, i) => {
                        if (i >= 3) {
                            return(
                                <View style={styles.view_succes} key={i}>

                                    <View style={styles.vue_numero}>
                                        <Text style={styles.numero}>{i+1}</Text>
                                    </View>

                                    <View style={styles.vue_image}>
                                        <ImagePersonnage image={etudiant.nom_personnage} size="tiny"/>
                                    </View>

                                    <View style={styles.vue_etudiant}>
                                        <Text style={styles.nom_etudiant}>{etudiant.nom} { etudiant.prenom }</Text>
                                        <Text style={styles.formation_etudiant}>{etudiant.formation.libelle}</Text>
                                    </View>

                                    <View style={styles.vue_points}>
                                        <Text style={styles.text_points}>{etudiant.nombre_points_semaine} pts</Text>
                                    </View>
                                </View>
                            )
                        }

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
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: "row",
    },




    // Numéro
    vue_numero: {
        justifyContent: "center",
        width: "20%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },

    numero: {
        fontFamily: "Dosis_800ExtraBold",
        fontSize: 30,
        textAlign: "center"
    },


    // Image
    vue_image: {
        padding: 10
    },


    // L'étudiant
    vue_etudiant: {
        justifyContent: "center",
        width: "40%"
    },

    nom_etudiant : {
        fontFamily: "Dosis_500Medium",
        fontSize: 18
    },

    formation_etudiant: {
        fontFamily: "Dosis_300Light"
    },


    // Les points
    vue_points : {
        justifyContent: "center",
        position: "absolute",
        right: 10,
        height: "100%"
    },

    text_points : {
        fontFamily: "Dosis_300Light"
    },


    // Les 3 meilleurs
    vue_classement: {
        flexDirection: "row",
        justifyContent: "center"
    },

    vue_classement2: {
        justifyContent: "flex-end",
        marginHorizontal: 10
    },

    numero_meilleurs: {
        fontFamily: "Dosis_500Medium",
        textAlign: "center",
        fontSize: 30
    },

    text_meilleurs: {
        fontFamily: "Dosis_700Bold",
        marginVertical: 5,
        fontSize: 10,
        textAlign: "center"
    },

    text_points_meilleurs: {
        textAlign: "center",
        fontFamily: "Dosis_300Light"
    }

})


