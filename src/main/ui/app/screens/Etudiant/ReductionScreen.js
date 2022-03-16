import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import {useEffect, useState} from "react";


export default function ReductionScreen() {

    const [reductions, setReductions] = useState([]);

    const donnesLesReductions = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/reductions');
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
        <View style={styles.view_globale}>
            <Text style={styles.titre_page}>Les réductions</Text>

            <ScrollView>

                {
                    reductions.map((reduction, i) => {
                        return (
                            <View style={styles.view_reduction}>
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


        </View>
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
        backgroundColor: "orange",
        width: "60%"
    },

    text_point : {
        fontWeight: "bold",
        textAlign: "center"
    },

    text_entreprise : {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center"
    },

    view_text_reduction: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },

    text_reduction: {
        fontStyle: "italic",
        fontSize: 14,
        color: "#65626F"
    },

    text_info: {
        color: "#B5B1AE",
        fontSize: 10
    }
});
