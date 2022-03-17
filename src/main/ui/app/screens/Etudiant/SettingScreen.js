import {StyleSheet, Text, View, TextInput, Button, Image, NativeModules} from 'react-native';
import { Dosis_200ExtraLight, Dosis_300Light, Dosis_400Regular, Dosis_500Medium, Dosis_600SemiBold, Dosis_700Bold, Dosis_800ExtraBold } from '@expo-google-fonts/dosis'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen() {
    return (

            <SafeAreaView style={styles.view_globale}>

                <View style={styles.view_image}>
                    <Image
                        style={styles.image_profil}
                        source={{uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQEOT59zyut71w/profile-displayphoto-shrink_200_200/0/1594911160362?e=1652918400&v=beta&t=-q3eVhslA4SEZ4LMaYtiKZPLX024YuhiLy-l90gbHrE'}}/>
                    <Text style={styles.identite}>Adrien RAFFORT</Text>
                    <Text style={styles.info_inscription}>Inscrit depuis le 12 février 2022</Text>

                </View>


                <View style={styles.un_parametre}>
                    <Text style={styles.titre_parametre}>Être notifié si une gemme apparait </Text>

                    <View style={styles.affichage}>
                        <View style={[styles.une, couleur.red]}><Text style={styles.nom}>Rubis</Text></View>
                        <View style={[styles.une, couleur.blue]}><Text style={styles.nom}>Saphir</Text></View>
                        <View style={[styles.une, couleur.green]}><Text style={styles.nom}>Émeraude</Text></View>
                    </View>

                    <View style={styles.affichage}>
                        <View style={[styles.une, couleur.purple]}><Text style={styles.nom}>Améthyste</Text></View>
                        <View style={[styles.une, couleur.black]}><Text style={styles.nom}>Tourmaline</Text></View>
                        <View style={[styles.une, couleur.yellow]}><Text style={styles.nom}>Ambre</Text></View>
                    </View>
                </View>

                <View style={styles.un_parametre}>
                    <Button title={"Déconnexion"} onPress={removeItemValue}/>
                </View>

                <View style={maintain.view}>
                    <Text style={maintain.text}>D'autres paramètres seront bientôt disponible ...</Text>
                </View>

            </SafeAreaView>
    );
}

const removeItemValue = async () => {

    try {
        await AsyncStorage.removeItem('@numero_etudiant');
        NativeModules.DevSettings.reload();
    }
    catch(exception) {
    }
}


const styles = StyleSheet.create({

    view_globale : {
        backgroundColor: "white",
        height: "100%"
    },

    image_profil: {
        height: 100,
        width: 100,
        borderRadius: 50,

    },

    view_image: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    identite: {
        margin: 10,
        fontWeight: "bold",
        fontSize: 20
    },

    info_inscription: {
        fontStyle: "italic"
    },

    affichage: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    un_parametre: {
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#F0F1F3",
        padding: 10,
        borderRadius: 10

    },

    titre_parametre: {
        textAlign: "center",
        paddingBottom: 10,
        fontWeight: "bold"
    },

    une : {
        padding: 5,
        width: "25%",
        margin: 5,
        borderRadius: 10,
    },

    nom : {
        color: "white",
        textAlign: "center"
    }
})


const couleur = StyleSheet.create({
    red : {
        backgroundColor: "#E76967",
    },
    blue : {
        backgroundColor: "#82C5F1",
    },
    green : {
        backgroundColor: "#63D7B9",
    },
    purple : {
        backgroundColor: "#B689E7",
    },
    black : {
        backgroundColor: "#373F4A",
    },
    yellow : {
        backgroundColor: "#EAAE7B",
    }
})


const maintain = StyleSheet.create({
    view : {
        margin: 70,
    },

    text: {
        fontStyle: "italic",
        fontSize: 25,
        color: "#65626F",
        textAlign: "center",
        fontFamily: "Dosis_200ExtraLight"
    }

})



