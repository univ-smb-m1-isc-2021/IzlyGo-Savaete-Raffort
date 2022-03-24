import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, ScrollView} from 'react-native';
import {useEffect, useState} from "react";


export default function ClassementScreen() {

    const [classement, setClassement] = useState([]);

    const donnesLeClassement = async () => {
        try {
            const response = await fetch('https://izlygo.herokuapp.com/api/classement/10');
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
            <ScrollView>
                {
                    classement.map((etudiant, i) => {
                        return(
                            <View style={styles.view_succes} key={i}>
                                <Text>{i+1}</Text>

                                <View>
                                    <Text style={styles.etudiant}>{}</Text>
                                    <Text>{etudiant.formation.libelle}</Text>
                                </View>

                                <Text style={styles.les_points}>{etudiant.nombre_points} pts</Text>
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

    etudiant : {
        fontWeight: "bold",
    }
})


