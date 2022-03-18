import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, ScrollView} from 'react-native';
import {useEffect, useState} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMedal, faCoins} from '@fortawesome/free-solid-svg-icons'

export default function ClassementScreen() {

    const [classement, setClassement] = useState([]);

    const donnesLeClassement = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/classement/10');
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
            {
                classement.map((etudiant, i) => {
                    return(
                        <View style={styles.view_succes} key={i}>
                            { afficheMedaille(i) }

                            <View>
                                <Text style={styles.etudiant}>{etudiant.prenom + " " + etudiant.nom}</Text>
                                <Text>{etudiant.formation.libelle}</Text>
                            </View>

                            <Text style={styles.les_points}>{etudiant.nombre_points} pts</Text>
                        </View>
                    )
                })

            }
        </View>
    );
};


function afficheMedaille(i){
    if (i == 0){
        return <FontAwesomeIcon icon={faMedal}  color={"#FEE101"} size={ 40 } />
    }else if(i == 1) {
        return <FontAwesomeIcon icon={faMedal}  color={"#A7A7AD"} size={ 40 } />
    }else if (i == 2) {
        return <FontAwesomeIcon icon={faMedal}  color={"#824A02"} size={ 40 } />
    }else {
        return <FontAwesomeIcon icon={faCoins}  color={"black"} size={ 40 } />
    }
}

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


