import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ModalNouveauMDP(props) {


    const [mdp_actuel, setMdpActuel] = React.useState('');
    const [mdp_nouveau, setMdpNouveau] = React.useState('');
    const [mdp_confirmation, setMdpConfirmation] = React.useState('');
    const [mdp_probleme, setMdpProbleme] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const modifierMDP = async() => {


        if(mdp_nouveau.length < 5){
            setMdpProbleme("Le nouveau mot de passe est trop petit.")
        }else {
            if (mdp_nouveau != mdp_confirmation){
                setMdpProbleme("Les mots de passe ne sont pas identiques.")
            }else {
                console.log("Ils correspondent")
                changeMdpBDD()

            }
        }

    }

    const resetPasswordFields = () => {
        setMdpActuel('')
        setMdpNouveau('')
        setMdpConfirmation('')
        setMdpProbleme('')
    }

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    const changeMdpBDD = async() => {

        const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')

        const edition = {
            etudiant: numero_etudiant,
            mdpActuel: '' + mdp_actuel,
            mdpNouveau: '' + mdp_nouveau,
            mdpConfirmation: '' + mdp_confirmation
        }

        fetch('https://izlygo.herokuapp.com/api/change-mot-de-passe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edition)
        }).then(response => response.json())
            .then(data => {
                if (data.response){
                    setLoading(true)
                    sleep(1000).then(()=>{
                        setLoading(false)
                        setModalVisible(false)
                    })

                    console.log("oo")

                }else {
                    setMdpProbleme("Le mot de passe actuel est incorrect.")
                }
            });
    }


    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View>
                            <Text style={styles.text_modal}>Mot de passe actuel</Text>
                            <TextInput
                                style={styles.input_modal}
                                onChangeText={setMdpActuel}
                                value={mdp_actuel}
                                autoCapitalize='none'
                                autoComplete='off'
                                secureTextEntry={true}
                            />
                        </View>

                        <View>
                            <Text style={styles.text_modal}>Nouveau mot de passe</Text>
                            <TextInput
                                style={styles.input_modal}
                                onChangeText={setMdpNouveau}
                                value={mdp_nouveau}
                                autoCapitalize='none'
                                autoComplete='off'
                                secureTextEntry={true}
                            />
                        </View>

                        <View>
                            <Text style={styles.text_modal}>Confirmer à nouveau</Text>
                            <TextInput
                                style={styles.input_modal}
                                onChangeText={setMdpConfirmation}
                                value={mdp_confirmation}
                                autoCapitalize='none'
                                autoComplete='off'
                                secureTextEntry={true}
                            />
                        </View>

                        { mdp_probleme != '' && <Text style={styles.text_probleme_mdp}>{mdp_probleme}</Text> }

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Fermer</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => modifierMDP()}
                            >
                                {
                                    loading ?
                                        <ActivityIndicator></ActivityIndicator>
                                        :
                                        <Text style={styles.textStyle}>Valider</Text>
                                }

                            </Pressable>
                        </View>







                    </View>
                </View>
            </Modal>



        </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Pressable style={{width: '75%', padding: 20, borderRadius: 5 }}
                           onPress={() => {resetPasswordFields(), setModalVisible(true)}}
                >
                    <Text style={{textAlign: 'center', color: 'black'}}>Modifier le mot de passe</Text>
                </Pressable>
            </View>

    </View>
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: "80%",
        margin: 20,
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
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        width: "40%"

    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "black",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Dosis_800ExtraBold",
        fontSize: 15
    },
    text_modal: {
        fontFamily: "Dosis_300Light",
        fontSize: 18,
    },

    input_modal: {
        backgroundColor: "#EEEEEE",
        width: "100%",
        padding: 5,
        borderRadius: 5,
        marginVertical: 10
    },

    text_probleme_mdp: {
        fontFamily: "Dosis_300Light",
        color: "red",
        marginVertical: 10
    }
});
