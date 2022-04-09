
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    Pressable,
    Picker,
    ScrollView,
    TouchableHighlight,
    Vibration, NativeModules
} from 'react-native';
import {SocialIcon} from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function InscriptionScreen(){

    const [formations, setFormations] = useState([]);
    const [section, setSection] = useState(1)


    const [numero, setNumero] = useState('0')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [parrainage, setCode] = useState('')

    const [numero_saisie, numeroB] = useState(false)
    const [nom_saisie, nomB] = useState(false)
    const [prenom_saisie, prenomB] = useState(false)
    const [mail_saisie, mailB] = useState(false)

    const [formation, setFormation] = useState(0)


    const peutFinir = false;

    const donneFormation = async () => {
        try {
            const response = await fetch('https://izlygo.herokuapp.com/api/formations');
            const json = await response.json();
            setFormations(json);
        } catch (error) {
            console.error(error);
        }
    }

        useEffect(() => {
            donneFormation();
        }, [])

        let serviceItems = formations.map((s, i) => {
            return <Picker.Item key={s.id} value={i} label={s.libelle}/>
        });


        function continuer(){


            numeroB(numero == 0 ? true : false)
            nomB(nom == '' ? true : false)
            prenomB(prenom == '' ? true : false)
            mailB(mail == '' ? true : false)




            if (numero_saisie == false && nom_saisie == false && prenom_saisie == false && mail_saisie == false){
                setSection(section + 1)
            }

        }


        function terminer(){
            const etudiant = {
                numero: 24000,
                nom: nom,
                prenom: prenom,
                mail: mail,
                formation: formations[formation],
                password: password,
                nombre_points : 0,
                compte_actif: true,
                code_parrain: parrainage,
                date_inscription: '',
                nom_icone: 'faFaceSmile',
                couleur_icone: '#E76967',
                nom_personnage: "personnage6"

            }


            fetch('https://izlygo.herokuapp.com/api/create/student', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(etudiant)
            }).then(response => response.json())
                .then(data => {
                    console.log("datadata")
                    console.log(data)
                    if(data.succes){
                        connect(data.etudiant.numero)
                    }
                });
        }

    const connect = async (numero) => {
        try {
            await AsyncStorage.setItem('@numero_etudiant', JSON.stringify(numero))
            NativeModules.DevSettings.reload();
        } catch (e) {
            // error reading value
        }
    }

    function retour(){
        setSection(section - 1)
    }

    return (
        <View style={{ height: '100%', backgroundColor: "white"}}>
            <ScrollView >
                <View style={s.vue_globale}>
                    {
                        section == 1 &&
                        <View style={s.vue_element} >
                            <Text style={s.titre_page}>Vos informations</Text>


                            <View style={s.vue_uneLigne}>
                                <Text style={s.nom_input}>Votre numéro étudiant</Text>
                                <TextInput
                                    style={[s.input, numero_saisie ? s.input_requis : '']}
                                    placeholder="Ex: 571891820"
                                    onChangeText={numero =>
                                    {
                                        setNumero(numero)
                                        numero == '' ? numeroB( true ) : numeroB( false )
                                    }}
                                    keyboardType="numeric"
                                    value={numero}
                                />
                                {
                                    numero_saisie ? <Text style={s.text_requis}>Votre numéro étudiant est requis</Text> : <></>
                                }
                            </View>

                            <View style={s.vue_uneLigne}>
                                <Text style={s.nom_input}>Votre nom</Text>
                                <TextInput
                                    style={[s.input,  nom_saisie ? s.input_requis : '']}
                                    placeholder="Ex: Dupont"
                                    onChangeText={nom =>
                                    {
                                        setNom(nom)
                                        nom == '' ? nomB( true ) : nomB( false )
                                    }}
                                    value={nom}
                                />
                                {
                                    nom_saisie ? <Text style={s.text_requis}>Votre nom est requis</Text> : <></>
                                }
                            </View>

                            <View style={s.vue_uneLigne}>
                                <Text style={s.nom_input}>Votre prénom</Text>
                                <TextInput
                                    style={[s.input,  prenom_saisie ? s.input_requis : '']}
                                    placeholder="Ex: Magalie"
                                    onChangeText={prenom =>
                                    {
                                        setPrenom(prenom)
                                        prenom == '' ? prenomB( true ) : prenomB( false )
                                    }}
                                    value={prenom}
                                />
                                {
                                    prenom_saisie ? <Text style={s.text_requis}>Votre prénom est requis</Text> : <></>
                                }
                            </View>

                            <View style={s.vue_uneLigne}>
                                <Text style={s.nom_input}>Votre adresse mail</Text>
                                <TextInput
                                    style={[s.input,  mail_saisie ? s.input_requis : '']}
                                    placeholder="Ex: magalie.dupont@etu.univ-smb.fr"
                                    onChangeText={mail =>
                                    {
                                        setMail(mail)
                                        mail == '' ? mailB( true ) : mailB( false )
                                    }}
                                    value={mail}
                                />
                                {
                                    mail_saisie ? <Text style={s.text_requis}>Votre mail est requis</Text> : <></>
                                }
                            </View>


                            <View style={s.vue_uneLigne}>
                                <Text style={s.nom_input}>Un code parrain ?</Text>
                                <TextInput
                                    style={s.input}
                                    placeholder="Saisissez le ici"
                                    onChangeText={code =>
                                    {
                                        setCode(code)
                                    }}
                                    value={parrainage}
                                />
                            </View>


                            <TouchableHighlight underlayColor="white" onPress={() => continuer()}>
                                <View style={s.bouton_continuer}>
                                    <Text style={s.text_bouton}>Continuer</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    }

                    {
                        section == 2 &&
                        <View style={s.vue_element}>
                            <Text style={s.titre_page}>Votre formation</Text>
                            <Picker selectedValue={formation} onValueChange={(v, k) => { setFormation(v) }}>
                                {serviceItems}
                            </Picker>

                            <View style={s.vue_boutons}>
                                <TouchableHighlight underlayColor="white" onPress={() => retour()}>
                                    <View style={s.bouton_continuer}>
                                        <Text style={s.text_bouton}>Retour</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight underlayColor="white" onPress={() => continuer()}>
                                    <View style={s.bouton_continuer}>
                                        <Text style={s.text_bouton}>Continuer</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                    }

                    {
                        section == 3 &&
                        <View style={s.vue_element}>

                            <View style={s.vue_uneLigne}>

                                <Text style={s.titre_page}>Votre mot de passe</Text>

                                <Text style={s.nom_input}>Saisissez un mot de passe</Text>
                                <TextInput
                                    style={s.input}
                                    onChangeText={password =>
                                    {
                                        setPassword(password)
                                    }}
                                    value={password}
                                />
                            </View>

                            <View style={s.vue_uneLigne}>


                                <Text style={s.nom_input}>Confirmer le mot de passe</Text>
                                <TextInput
                                    style={s.input}
                                    //onChangeText={}
                                />

                            </View>


                            <View style={s.vue_boutons}>
                                <TouchableHighlight underlayColor="white" onPress={() => retour()}>
                                    <View style={s.bouton_continuer}>
                                        <Text style={s.text_bouton}>Retour</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight underlayColor="white" onPress={() => terminer()}>
                                    <View style={s.bouton_continuer}>
                                        <Text style={s.text_bouton}>Terminer</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>

                    }



                </View>

            </ScrollView>
        </View>


        )

}

const s = StyleSheet.create({



    vue_element: {
        marginTop: "5%",
        marginHorizontal: "10%"
    },

    titre_page: {
        fontWeight: "bold",
        fontSize: 22,
        marginBottom: 30
    },


    vue_uneLigne: {
        marginVertical: 10
    },

    nom_input: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10,
    },

    input: {
        backgroundColor: "#EEEEEE",
        padding: 10,
        borderRadius: 10,
        height: 50,
    },

    input_requis: {
        borderColor: "red",
        borderWidth: 1
    },

    text_requis: {
        fontSize: 10,
        color: "red"
    },


    bouton_continuer: {
        backgroundColor: "black",
        width: "50%",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        position: "absolute",
        right: 0
    },

    text_bouton: {
        textAlign: "center",
        justifyContent: "center",
        fontFamily: 'Dosis_700Bold',
        color: 'white',
        fontSize: 18
    },

    vue_boutons: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})