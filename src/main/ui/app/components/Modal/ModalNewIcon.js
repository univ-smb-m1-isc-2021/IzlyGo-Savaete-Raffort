import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePersonnage from "../ImagePersonnage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import * as Haptics from "expo-haptics";


export default function ModalNewIcon(props) {

    const [num_person, setNumPerso] = React.useState(1)


    const changePicture = (isLeft) => {
        if(isLeft) {
            num_person == 1 ? setNumPerso(9) : setNumPerso(num_person - 1)
        }
        else {
            num_person == 9 ? setNumPerso(1) : setNumPerso(num_person + 1)
        }

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    }


    useEffect(() => {
        setNumPerso(props.num)

    }, [])


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

                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>

                                <View style={styles.view_arrow}>
                                    <Pressable onPress={() => changePicture(true) }
                                    >
                                        <FontAwesomeIcon icon={faArrowLeft}  color={"black"} size={ 20 }/>
                                    </Pressable>
                                </View>
                                <ImagePersonnage size={'normal'} image={'personnage' + num_person}></ImagePersonnage>

                                <View style={styles.view_arrow}>
                                    <Pressable onPress={() => changePicture(false) }
                                    >
                                        <FontAwesomeIcon icon={faArrowRight}  color={"black"} size={ 20 }/>
                                    </Pressable>
                                </View>
                            </View>



                            <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Fermer</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >

                                    <Text style={styles.textStyle}>Valider</Text>


                                </Pressable>
                            </View>



                        </View>
                    </View>
                </Modal>



            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Pressable style={{width: '75%', padding: 20, borderRadius: 5 }}
                           onPress={() => setModalVisible(true) }
                >
                    <Text style={{textAlign: 'center', color: 'black'}}>Modifier mon personnage</Text>
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
    },




    view_arrow: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 30
    }
});
