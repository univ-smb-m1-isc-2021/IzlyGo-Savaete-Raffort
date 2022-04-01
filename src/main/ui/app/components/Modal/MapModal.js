import React, {useEffect, useState} from "react";
import {Alert, Image, Modal, Pressable, StyleSheet, Text, View} from "react-native";

export default function MapModal(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalIsLoad, setLoading] = useState(false);

    useEffect(()=> {
        setModalVisible(props.visibility)
        setLoading(true)
    }, [props.visibility])

    return (

        <View>

            {

                modalIsLoad &&

                    <Modal animationType="slide"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={stylesModal.centeredView}>
                            <View style={stylesModal.modalView}>

                                <Text style={stylesModal.title_modal}>Gemme Ambre</Text>

                                <View style={stylesModal.view_container}>
                                    <View>
                                        <Image style={stylesModal.tiny_icon} source={require('../../screens/images/ambre.png')} />
                                        <Text style={{ textAlign: "center", fontFamily: 'Dosis_200ExtraLight', color: 'gray', fontSize: 20}}>1 point</Text>
                                    </View>

                                    <View style={{ justifyContent: 'center'}}>
                                        <Text style={{ fontFamily: "Dosis_500Medium", fontSize: 18}}><Text style={{ fontFamily: "Dosis_800ExtraBold"}}>Limitation :</Text> 78 / 100</Text>
                                    </View>
                                </View>




                                <Pressable
                                    style={[stylesModal.button, stylesModal.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={stylesModal.textStyle}>Récupérer</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
            }

        </View>

    )


}

const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
    },
    modalView: {
        margin: 30,
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
        elevation: 5,
    },

    button: {
        borderRadius: 20,
        padding: 10,
        marginTop: 40
    },

    buttonClose: {
        backgroundColor: "#EAAE7B",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'Dosis_700Bold',
        fontSize: 20
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
        fontFamily: "Dosis_200ExtraLight",
        fontSize: 25,
        paddingBottom: 20
    }
});
