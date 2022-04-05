import React, {useEffect, useState} from "react";
import {Alert, Image, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import ImageGemme from "../ImageGemme";
export default function SuccesModal(props) {

    const [visible, setVisible] = useState(false);
    const [modalIsLoad, setLoading] = useState(false);


    useEffect(() => {
        setVisible(props.visibility)
    }, [props.visibility])

    return (

        <View style={stylesModal.vue_modal_générale}>
        {
            visible &&

                <Modal animationType="slide"
                       transparent={true}
                       visible={visible}
                >
                    <View style={{position: 'absolute', bottom: 100, width: "100%"}}>
                        <View style={stylesModal.modalView}>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={stylesModal.title_modal}> Vous avez validé un challenge !</Text>
                            </View>
                        </View>
                    </View>
                </Modal>

        }

        </View>
    )
}

const stylesModal = StyleSheet.create({
    vue_modal_générale: {
        backgroundColor: "yellow",
    },
    modalView: {
        marginHorizontal: 30,
        backgroundColor: "#27ae60",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,

    },

    view_container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    tiny_icon : {
        width: 75,
        height: 75
    },

    title_modal: {
        textAlign: "center",
        fontFamily: "Dosis_700Bold",
        fontSize: 20,
        color: "white"
    }
});
