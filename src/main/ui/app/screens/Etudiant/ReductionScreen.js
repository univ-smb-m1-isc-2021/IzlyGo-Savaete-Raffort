import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {useEffect, useState} from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function ReductionScreen() {

    const [reductions, setReductions] = useState([]);

    const donnesLesReductions = async () => {
        try {
            const response = await fetch('https://izlygo.herokuapp.com/api/reductions');
            const json = await response.json();

            setReductions(json);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        donnesLesReductions();
    }, []);


    return (
        <SafeAreaView style={styles.view_globale}>

            <View style={styles.points}>
                <Text style={styles.points4}>Total de vos points IzlyGo :</Text>
                <Text style={styles.points2}>540 points </Text>
                <Text style={styles.points3}>Soit 4.3 €</Text>
            </View>

            <Text style={styles.titre_page}>Les réductions</Text>

            <ScrollView>

                {
                    reductions.map((reduction, i) => {
                        return (
                            <View style={styles.view_reduction} key={i}>
                                <View style={styles.row}>
                                    <View style={[styles.view_point, styles.view_tag]}>
                                        <Text style={styles.text_point}>{reduction.points_requis} points</Text>
                                    </View>
                                    <View style={[styles.view_nom_entreprise, styles.view_tag]}>
                                        <Text style={styles.text_entreprise}>{reduction.entreprise.nom} </Text>
                                    </View>
                                </View>

                                <View style={styles.view_text_reduction}>
                                    <Text style={styles.text_reduction}>{reduction.libelle} </Text>
                                    <Text style={styles.text_info}>Cliquez pour plus d'infos</Text>
                                </View>

                            </View>
                        )
                    })
                }
            </ScrollView>


        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    titre_page: {
        fontWeight: "100",
        fontSize: 20,
        margin: 20
    },

    view_globale : {
        backgroundColor: "white",
        height: "100%"
    },

    view_reduction : {
        backgroundColor: "#F0F1F3",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        padding: 10

    },

    row : {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30
    },

    view_tag : {
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
    },

    view_point: {
        backgroundColor: "#FEFBF6",

    },

    view_nom_entreprise : {
        backgroundColor: "#EAAE7B",
        width: "60%"
    },

    text_point : {
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Dosis_800ExtraBold"
    },

    text_entreprise : {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Dosis_700Bold"
    },

    view_text_reduction: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },

    text_reduction: {
        fontFamily: "Dosis_500Medium",
        fontSize: 14,
        color: "#65626F"
    },

    text_info: {
        color: "#B5B1AE",
        fontSize: 12,
        fontFamily: "Dosis_300Light"
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
});
