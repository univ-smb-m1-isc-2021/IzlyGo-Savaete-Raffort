import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight,
    Alert,
    Modal, Pressable
} from 'react-native';
import React, {useEffect, useState} from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ProgressBar} from "react-native-paper";


export default function ReductionScreen() {

    const [reductions, setReductions] = useState([]);
    const [etudiant, setEtudiant] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [reductionSelection, setReductionSelection] = useState(null);


    const donnesLesReductions = async () => {
        try {
            const numero_etudiant = await AsyncStorage.getItem('@numero_etudiant')

            const response = await fetch('https://izlygo.herokuapp.com/api/reductions/' + numero_etudiant);
            const json = await response.json();

            setReductions(json.reductions);
            setEtudiant(json.etudiant)
            setIsLoading(true)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        donnesLesReductions();
    }, [isLoading,refresh]);

    function retirePoints(){

        fetch('https://izlygo.herokuapp.com/api/utilise-reduction/' + etudiant.numero, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reductionSelection)
        }).then(response => response.json())
            .then(data => {
                setRefresh(!refresh)
            });
    }



    return (
        <SafeAreaView style={styles.view_globale}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>

                        <Text style={stylesModal.title_modal}> {  reductionSelection != null ? reductionSelection.entreprise.nom : ''}</Text>

                        <Text style={stylesModal.modalText}>Voulez vous utilisez { reductionSelection != null ? reductionSelection.points_requis : '' } points ?</Text>

                        <View style={{flexDirection: "row"}}>
                            <Pressable
                                style={[stylesModal.button, stylesModal.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={stylesModal.textStyle}>Fermer</Text>
                            </Pressable>

                            <Pressable
                                style={[stylesModal.button, stylesModal.buttonClose]}
                                onPress={() => {setModalVisible(!modalVisible), retirePoints()}}
                            >
                                <Text style={stylesModal.textStyle}>Utiliser</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

            {
                isLoading ?
                    <View>
                        <View style={styles.points}>
                            <Text style={styles.points4}>Total de vos points IzlyGo :</Text>
                            <Text style={styles.points2}>{ etudiant.nombre_points } points </Text>
                            <Text style={styles.points3}>Soit {etudiant.nombre_euros } €</Text>
                        </View>

                        <Text style={styles.titre_page}>Les réductions</Text>

                        <ScrollView>
 
                            {
                                reductions.map((reduction, i) => {
                                    return (
                                        <TouchableHighlight  key={i} onPress={() => reduction.accessible ? (setReductionSelection(reduction), setModalVisible(true)) : ''} underlayColor="white">
                                            <View style={[styles.view_reduction, !reduction.accessible ? styles.non_accessible : '' ]}>
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

                                                <ProgressBar  style={styles.progress_bar} progress={ etudiant.nombre_points / reduction.points_requis } color="#63D7B9" />

                                            </View>
                                        </TouchableHighlight>
                                    )
                                })
                            }
                        </ScrollView>

                    </View>
            :
            <View style={{flexDirection: "row", justifyContent: "center", height: "100%"}}>
                <ActivityIndicator size="large" color="#2c3e50"/>
            </View>
            }


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
        backgroundColor: "#63D7B9",
        width: "50%"
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
        fontSize: 17,
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

    progress_bar: {
        margin: 10,
        borderRadius: 10,
        height: 15
    },

    non_accessible: {
        opacity: 0.7
    }
});



const App2 = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={stylesModal.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>
                        <Text style={stylesModal.modalText}>Hello World!</Text>
                        <Pressable
                            style={[stylesModal.button, stylesModal.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={stylesModal.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


            <Pressable
                style={[stylesModal.button, stylesModal.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={stylesModal.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    );
};

const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: "Dosis_600SemiBold",
        fontSize: 20
    },

    title_modal: {
        textAlign: "center",
        fontFamily: "Dosis_200ExtraLight",
        fontSize: 25,
        paddingBottom: 20
    }
});

