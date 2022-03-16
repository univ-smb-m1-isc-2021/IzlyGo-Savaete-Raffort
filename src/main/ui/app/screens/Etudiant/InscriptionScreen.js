
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert, Pressable, Picker, ScrollView } from 'react-native';
import {SocialIcon} from 'react-native-elements';

export default function InscriptionScreen(){

        const [formations, setFormations] = useState([]);
        const etudiant = {
            nom: null,
            prenom: null,
            mail: null,
            numero: 0,
            formation_id: 1
        }

        const peutFinir = false;

        const donneFormation = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/formations');
                const json = await response.json();
                setFormations(json);
            } catch (error) {
                console.error(error);
            }
        }

        useEffect(() => {
            donneFormation();
        }, []);

        let serviceItems = formations.map((s, i) => {
            console.log(s.chemin)
            return <Picker.Item key={i} value={s.libelle} label={s.libelle}/>
        });

        return (
            <ScrollView>
                <View style={styles.view}>
                    <View style={styles.viewTitle}>
                        <Text style={styles.bigTitle}>Créer un compte étudiant</Text>
                    </View>
                    <View>
                    </View>

                    <View style={styles.social}>
                        <SocialIcon
                            type="facebook"
                            onPress={() => {
                                alert('facebook');
                            }}
                        />

                        <SocialIcon
                            type="google"
                            onPress={() => {
                                alert('facebook');
                            }}
                        />
                        <SocialIcon
                            type="linkedin"
                            onPress={() => {
                                alert('facebook');
                            }}
                        />
                    </View>

                    <View style={styles.viewOption}>
                        <Text style={styles.option}>Ou utiliser votre adresse mail pour vous inscrire</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            onChangeText={newText => etudiant.nom = newText}
                            onChangeText={newText => etudiant.nom = newText}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            onChangeText={newText => etudiant.prenom = newText}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Adresse mail"
                            onChangeText={newText => etudiant.mail = newText}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Numéro étudiant"
                            keyboardType="numeric"
                            onChangeText={newText => etudiant.numero = newText}
                        />

                        <Picker>
                            {serviceItems}
                        </Picker>

                        <But donnees={etudiant}/>

                        <Button
                            title="J'ai déjà un compte. Me connecter"

                        >
                        </Button>
                    </View>
                </View>
            </ScrollView>

        )

}

const But = (props) => {
    return (
        <Pressable style={styles.button} onPress={() => {


            fetch('http://localhost:8080/api/create/student', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.donnees)
            }).then(response => {
                console.log(response)
            })

        }}>
            <Text style={styles.text}>S'inscrire</Text>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 45,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#E7EAEE',
        textAlign: "center",
        padding: 10,
    },
    button: {
        backgroundColor: "#7389C1",
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 15,
        borderRadius: 10,
        height: 50
    },
    text: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },
    bigTitle: {
        color: "#7389C1",
        fontWeight: "bold",
        fontSize: 25,
    },
    view: {
        marginTop: 50,
    },
    viewTitle: {
        width: '100%',
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    option: {
        color: "#A7AAAF",
        justifyContent: "center",
        alignItems: "center",
    },
    social: {

        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginBottom: 30
    },
    viewOption: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    }
});
