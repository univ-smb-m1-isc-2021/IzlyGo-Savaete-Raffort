import React, {useEffect, useState} from "react";
import {Alert, Image, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import ImageGemme from "../ImageGemme";
export default function AjoutGemmeModal(props) {

    const [visible, setVisible] = useState(false);
    const [gemme, setGemme] = useState(false);


    useEffect(() => {
        setGemme(props.gemme)
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

                            <View>
                                <Text style={stylesModal.title_modal}>Gemme {gemme.nom} récupéré</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "center"}}>
                                <View style={stylesModal.subView}>
                                    <Text style={stylesModal.subtitle_modal}> + 1</Text>
                                </View>
                                <View style={stylesModal.subView}>
                                    <ImageGemme size='very-tiny' image={gemme.chemin_image}/>
                                </View>
                            </View>



                        </View>
                    </View>
                </Modal>

            }

        </View>
    )
}

const stylesModal = StyleSheet.create({

    modalView: {
        backgroundColor: "white",
        marginHorizontal: 30,
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


    title_modal: {
        textAlign: "center",
        fontFamily: "Dosis_600SemiBold",
        fontSize: 20,
        color: "black"
    },


    subtitle_modal: {
        textAlign: "center",
        fontFamily: "Dosis_300Light",
        fontSize: 30,
        color: "black"
    },



    subView: {
        justifyContent: "center",
        marginHorizontal: 5
    }
});
