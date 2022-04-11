import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules, ScrollView, TouchableHighlight, Modal, Pressable, ActivityIndicator} from 'react-native';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faFaceAngry, faFaceGrinBeam, faFaceFlushed, faGrinHearts, faGrinStars, faFaceGrinWide, faFaceGrinTongue, faFaceMeh, faFaceLaughWink, faFaceSmileBeam, faFaceSmile, faFaceSadTear} from '@fortawesome/free-solid-svg-icons'
import React, {useState} from "react";
import {color} from "react-native-elements/dist/helpers";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalNouveauMDP from "../../../components/Modal/ModalNouveauMDP";
import ModalNewIcon from "../../../components/Modal/ModalNewIcon";

export default function ProfilScreen() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <ModalNouveauMDP></ModalNouveauMDP>
            <ModalNewIcon num={6}></ModalNewIcon>
        </View>
    );
};

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
        textAlign: "center"
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

